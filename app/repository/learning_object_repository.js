import mongoose from "mongoose"
import InvalidArgumentError from "../utils/invalid_argument_error.js"
import Logger from "../logger.js"

let logger = Logger.getLogger()

class LearningObjectRepository {
    save(obj, callback = (err) => { console.log(err) }) {
        obj.save(callback)
    }
}

export default LearningObjectRepository