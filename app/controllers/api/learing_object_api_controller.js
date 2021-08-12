import Logger from "../../logger.js"
import path from "path"
import LearningObjectRepository from "../../repository/learning_object_repository.js";

let logger = Logger.getLogger()

let learningObjectApiController = {}

learningObjectApiController.getLearningObject = (req, res) => {
    let id = req.params.id;
    let redirectpath = path.join("/", process.env.LEARNING_OBJECT_STORAGE_LOCATION, id);
    return res.redirect(redirectpath);
};

learningObjectApiController.getMetadata = async (req, res) => {
    let metadata;
    let repos = new LearningObjectRepository();

    await new Promise((resolve) => {
        repos.findById(req.params.id, (err, res) => {
            if (err) {
                logger.error("Could not retrieve learning object from database: " + err.message);
            }
            metadata = res;
            resolve();
        })
    });
    if (metadata) {
        return res.json(metadata);
    }
    return res.send("Could not retrieve learning object from database.");
};


export default learningObjectApiController;