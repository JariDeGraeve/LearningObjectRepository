import mongoose from "mongoose"
import InvalidArgumentError from "../utils/invalid_argument_error.js"
import Logger from "../logger.js"
import LearningObject from "../models/learning_object.js"

let logger = Logger.getLogger()

class LearningPathRepository {
    save(obj, callback = (err) => { console.log(err) }) {
        obj.save(callback)
    }

    find(query, callback = (err) => { console.log(err) }) {
        //LearningPath.find(query, callback);
        console.log("need to store learningpath first before trying to find it")
    }
}

export default LearningPathRepository