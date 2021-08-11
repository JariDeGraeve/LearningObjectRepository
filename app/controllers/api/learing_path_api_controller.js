import Logger from "../../logger.js"
import path from "path"
import LearningPathRepository from "../../repository/learning_path_repository.js";
import JsonValidator from "../../utils/json_validator.js";
import { readFileSync } from "fs";
import LearningPath from "../../models/learning_path.js";
import UserLogger from "../../utils/user_logger.js";

let logger = Logger.getLogger()

let learningPathApiController = {}

learningPathApiController.saveLearningPath = (file) => {
    let json = JSON.parse(file.buffer.toString());
    let jsonValidator = new JsonValidator(JSON.parse(readFileSync(path.resolve("app", "controllers", "api", "learning_path_schema.json"))));
    let valid = jsonValidator.validate(json);
    if (valid) {

        json.image = Buffer.from(json.image, 'base64');
        let learningPath = LearningPath(json);
        let repos = new LearningPathRepository();
        repos.save(learningPath, (err) => {
            if (err) {
                logger.error("The learning-path with hruid '" + learningPath.hruid + "' could not be saved: " + err.message);
                UserLogger.error("The learning-path with hruid '" + learningPath.hruid + "' could not be saved due to an error with the database or with the data.")
            } else {
                logger.info("The learning-path with hruid '" + learningPath.hruid + "' has been saved correctly.");
                UserLogger.info("The learning-path with hruid '" + learningPath.hruid + "' has been saved correctly.");
            }
        })
    } else {
        let errorString = "Errors while saving learning-path from file " + file.originalname + ": " + jsonValidator.getErrors().map((e) => e.message);
        logger.error(errorString);
    }
}

learningPathApiController.getLearningPathFromId = async (req, res) => {
    let path;
    let repos = new LearningPathRepository();

    await new Promise((resolve) => {
        repos.findById(req.params.id, (err, res) => {
            if (err) {
                logger.error("Could not retrieve learning path from database: " + err.message);
            }
            path = res;
            resolve();
        })
    });
    if (path) {
        let resPath = {};
        // Yes, this is ugly, I'd rather do this with .map or just changing the image key in the path object, but it doesn't work and this was the only way out after all this time searching.
        resPath = {
            _id: path._id,
            hruid: path.hruid,
            title: path.title,
            description: path.description,
            image: path.image.toString('base64'),
            nodes: path.nodes,
            uuid: path.uuid,
            created_at: path.created_at,
            updatedAt: path.updatedAt,
            __v: path.__v
        }
        return res.json(resPath);
    }
    return res.send("Could not retrieve learning path from database.");

}

learningPathApiController.getLearningPaths = async (req, res) => {
    let query = req.query ? req.query : {};
    let repos = new LearningPathRepository();
    let loginfo = "Requested learning path with query: {";

    if (query.all) {
        query = {
            title: query.all,
            description: query.all,
            hruid: query.all
        }
    }

    let queryList = []
    for (const [key, value] of Object.entries(query)) {
        let obj = {};
        obj[key] = new RegExp(".*" + value + ".*");
        queryList.push(obj);
        loginfo += key + ": " + value + ", "
    }
    logger.info(loginfo.slice(0, -2) + "}")

    query = { $or: queryList }

    let paths;
    await new Promise((resolve) => {
        repos.find(query, (err, res) => {
            if (err) {
                logger.error("Could not retrieve learning paths from database: " + err.message);
            }
            paths = res;
            resolve();
        })
    });
    if (paths) {
        let resPaths = [];
        // Yes, this is ugly, I'd rather do this with .map or just changing the image key in the path object, but it doesn't work and this was the only way out after all this time searching.
        paths.forEach(p => {
            resPaths.push({
                _id: p._id,
                hruid: p.hruid,
                title: p.title,
                description: p.description,
                image: p.image.toString('base64'),
                nodes: p.nodes,
                uuid: p.uuid,
                created_at: p.created_at,
                updatedAt: p.updatedAt,
                __v: p.__v
            })
        });
        return res.json(resPaths);
    }

    return res.send("Could not retrieve learning paths from database.");
};



export default learningPathApiController;