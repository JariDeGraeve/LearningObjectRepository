import Logger from "../../logger.js"
import path from "path"
import LearningPathRepository from "../../repository/learning_path_repository.js";

let logger = Logger.getLogger()

let learningPathApiController = {}

learningPathApiController.getLearningPaths = async (req, res) => {
    let query = req.query ? req.query : {};
    let repos = new LearningPathRepository();
    let loginfo = "Requested learning path with query: {";

    for (const [key, value] of Object.entries(query)) {
        query[key] = new RegExp(".*" + value + ".*");
        loginfo += key + ": " + value + ","
    }
    logger.info(loginfo + "}")

    if (query.all) {
        query = {
            title: query.all,
            description: query.all,
            hruid: query.all
        }
    }

    query = { $or: [query] }

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
    console.log(paths);
    return res.send(paths);
};



export default learningPathApiController;