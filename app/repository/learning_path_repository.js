import Logger from "../logger.js"
import LearningPath from "../models/learning_path.js"

class LearningPathRepository {
    save(obj, callback = (err) => { console.log(err) }) {
        obj.save(callback)
    }

    find(query, callback = (err) => { console.log(err) }) {
        LearningPath.find(query, callback);
    }
}

export default LearningPathRepository