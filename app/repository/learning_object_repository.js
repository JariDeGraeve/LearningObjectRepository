import mongoose from "mongoose"
import InvalidArgumentError from "../utils/invalid_argument_error.js"
import Logger from "../logger.js"
import LearningObject from "../models/learning_object.js"

let logger = Logger.getLogger()

class LearningObjectRepository {
    save(obj, callback = (err) => { console.log(err) }) {
        obj.save(callback)
    }

    async update(id, callback = (err) => { console.log(err) }) {
        let obj;
        await new Promise((resolve) => {
            LearningObject.findById(id, (err, res) => {
                if (err) {
                    logger.error("The object with id '" + id + "' could not be found: " + err.message);
                }
                obj = res;
                resolve();
            })
        });
        obj.save(callback)
    }

    findAll(callback = (err) => { console.log(err) }) {
        LearningObject.find({}, callback);
    }
}

export default LearningObjectRepository