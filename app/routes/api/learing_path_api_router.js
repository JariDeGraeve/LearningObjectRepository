import express from "express"
import learningPathApiController from "../../controllers/api/learing_path_api_controller.js"
let learningPathApiRouter = express.Router({ mergeParams: true });

learningPathApiRouter.route("/search").get((req, res) => {
    learningPathApiController.getLearningPaths(req, res);
});

learningPathApiRouter.route("/:id").get((req, res) => {
    learningPathApiController.getLearningPathFromId(req, res);
});

export default learningPathApiRouter;