import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'
import Logger from "../logger.js"
import learningPathNodeSchema from "./learning_path_node.js"

const Schema = mongoose;

const learningPathSchema = new mongoose.Schema({
    uuid: {      // UUID (different from the automatically generated _id)
        type: String,
        required: true,
        default: uuidv4, // Use automatically generated uuid as identifier (unique in combination with version and language)
    },
    hruid: {    // Human readable unique id, can be any string chosen by the user -> generates error if chosen id exists. Should be different for each version of the same document.
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: Buffer
    },
    language: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["aa", "ab", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "ba", "bm", "eu", "be", "bn", "bh", "bi", "bs", "br", "bg", "my", "ca", "ch", "ce", "zh", "cu", "cv", "kw", "co", "cr", "cs", "da", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "fy", "ff", "ka", "de", "gd", "ga", "gl", "gv", "el", "gn", "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig", "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it", "jv", "ja", "kl", "kn", "ks", "kr", "kk", "km", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li", "ln", "lt", "lb", "lu", "lg", "mk", "mh", "ml", "mi", "mr", "ms", "mg", "mt", "mn", "na", "nv", "nr", "nd", "ng", "ne", "nn", "nb", "no", "ny", "oc", "oj", "or", "om", "os", "pa", "fa", "pi", "pl", "pt", "ps", "qu", "rm", "ro", "rn", "ru", "sg", "sa", "si", "sk", "sl", "se", "sm", "sn", "sd", "so", "st", "es", "sc", "sr", "ss", "su", "sw", "sv", "ty", "ta", "tt", "te", "tg", "tl", "th", "bo", "ti", "to", "tn", "ts", "tk", "tr", "tw", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "cy", "wa", "wo", "xh", "yi", "yo", "za", "zu"],
    },
    title: {    // Title of the learning object
        type: String,
        required: true,
        trim: true,
    },
    description: {  //Description of the learning object
        type: String,
        required: true,
        trim: true,
    },
    nodes: {
        type: [learningPathNodeSchema],
        required: true
    }

}, { timestamps: { createdAt: 'created_at' } });

// Enforce unique index on combination of _id, version and language
learningPathSchema.index({ hruid: 1, language: 1 }, { unique: true });

const LearningPath = mongoose.model('LearningPath', learningPathSchema);

export default LearningPath
