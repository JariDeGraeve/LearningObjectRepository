import mongoose from "mongoose"
import InvalidArgumentError from "../utils/invalid_argument_error.js"
import Logger from "../logger.js"
import LearningObject from "../models/learning_object.js"

let logger = Logger.getLogger()

class LearningObjectRepository {
    save(obj, callback = (err) => { console.log(err) }) {
        obj.save(callback)
    }

    update(id, callback = (err) => { console.log(err) }) {
        let obj = LearningObject.findById(id);
        // TODO blijkbaar lukt dit niet..
        obj.save(callback)
    }

    findAll(callback = (err) => { console.log(err) }) {
        return LearningObject.find({}, callback);
    }
}

export default LearningObjectRepository