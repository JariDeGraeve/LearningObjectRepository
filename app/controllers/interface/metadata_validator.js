import { v4 as uuidv4 } from 'uuid'
import Logger from "../../logger.js"
import UserLogger from '../../utils/user_logger.js'

class MetadataValidator {

    constructor(_metadata, _ids) {
        this.allHruids = _ids.map((id) => {
            return id.hruid;
        })
        this.metadata = _metadata;
        this.uuid = _metadata.uuid;
        this.hruid = _metadata.hruid;
        this.version = _metadata.version;
        this.language = _metadata.language;
        this.title = _metadata.title;
        this.description = _metadata.description;
        this.keywords = _metadata.keywords;
        this.educational_goals = _metadata.educational_goals;
        this.copyright = _metadata.copyright;
        this.licence = _metadata.licence;
        this.content_type = _metadata.content_type;
        this.available = _metadata.available;
        this.target_ages = _metadata.target_ages;
        this.difficulty = _metadata.difficulty;
        this.return_value = _metadata.return_value;
        this.content_location = _metadata.content_location;
    }

    validators = {
        uuid() {
            // required (default is random generated)
            if (this.uuid == undefined) {
                this.metadata.uuid = uuidv4();
                return;
            }
            // type String
            if (typeof this.uuid != "string") {
                return "- The uuid needs to be of type string.\n";
            }
        },

        hruid() {
            // required
            if (this.hruid == undefined) {
                return "- A parameter hruid is required.\n"
            }
            // type String
            if (typeof this.hruid != "string") {
                return "- The hruid needs to be of type string.\n";
            }
            // unique
            if (this.allHruids.includes(this.hruid)) {
                return "- The hruid needs to be unique ";
            }

            // trim
            this.metadata.hruid = this.hruid.trim();

        },

        version() {
            // type Number
            if (this.version != undefined) {
                if (typeof this.version != "number") {
                    return "- The version needs to be of type number.\n";
                }
            }
        },

        language() {
            // required
            if (this.language == undefined) {
                return "- A parameter language is required.\n"
            }

            // type String
            if (typeof this.language != "string") {
                return "- The language needs to be of type string.\n";
            }

            // existing lang
            let languages = ["aa", "ab", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "ba", "bm", "eu", "be", "bn", "bh", "bi", "bs", "br", "bg", "my", "ca", "ch", "ce", "zh", "cu", "cv", "kw", "co", "cr", "cs", "da", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "fy", "ff", "ka", "de", "gd", "ga", "gl", "gv", "el", "gn", "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig", "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it", "jv", "ja", "kl", "kn", "ks", "kr", "kk", "km", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li", "ln", "lt", "lb", "lu", "lg", "mk", "mh", "ml", "mi", "mr", "ms", "mg", "mt", "mn", "na", "nv", "nr", "nd", "ng", "ne", "nn", "nb", "no", "ny", "oc", "oj", "or", "om", "os", "pa", "fa", "pi", "pl", "pt", "ps", "qu", "rm", "ro", "rn", "ru", "sg", "sa", "si", "sk", "sl", "se", "sm", "sn", "sd", "so", "st", "es", "sc", "sr", "ss", "su", "sw", "sv", "ty", "ta", "tt", "te", "tg", "tl", "th", "bo", "ti", "to", "tn", "ts", "tk", "tr", "tw", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "cy", "wa", "wo", "xh", "yi", "yo", "za", "zu"];
            if (!languages.includes(this.language.toLowerCase())) {
                return "- This language is not valid. Make sure the language parameter is a string of two characters.\n";
            }

            // lowercase & trim
            this.metadata.language = this.language.trim().toLowerCase();

        },

        title() {
            // required
            if (this.title == undefined) {
                return "- A parameter title is required.\n";
            }

            // type String
            if (typeof this.title != "string") {
                return "- The title needs to be of type string.\n";
            }

            // trim
            this.metadata.title = this.title.trim();

        },

        description() {
            // required
            if (this.description == undefined) {
                return "- A parameter description is required.\n";
            }

            // type String
            if (typeof this.description != "string") {
                return "- The description needs to be of type string.\n";
            }

            // trim
            this.metadata.description = this.description.trim();
        },

        keywords() {
            if (this.keywords != undefined) {
                // type array
                if (!Array.isArray(this.keywords)) {
                    return "- The keywords parameter needs to be an array of strings.\n";
                }
                // elements are type string
                let err = "";
                for (let i = 0; i < this.keywords.length; i++) {
                    if (typeof this.keywords[i] != "string") {
                        err += "\t* '" + this.keywords[i] + "' is not of type string.\n";
                    }
                }
                if (err.length != 0) {
                    err = "- The keywords parameter needs to be an array of strings: \n" + err;
                    return err;
                }
            }
        },

        educational_goals() {
            if (this.educational_goals != undefined) {
                // type array
                if (!Array.isArray(this.educational_goals)) {
                    return "- The educational_goals parameter needs to be an array.\n";
                }

                // elements have source and/or id 
                let err = "";
                for (let i = 0; i < this.educational_goals.length; i++) {
                    if (!this.educational_goals[i].source && !this.educational_goals[i].id) {
                        return "- An educational goal needs to have a source and/or id.\n";
                    }
                    if (this.educational_goals[i].source) {
                        if (typeof this.educational_goals[i].source != "string") {
                            err += "\t* '" + this.educational_goals[i].source + "' is not of type string.\n";
                        }
                    }
                    if (this.educational_goals[i].id) {
                        if (typeof this.educational_goals[i].id != "string") {
                            err += "\t* '" + this.educational_goals[i].id + "' is not of type string.\n";
                        }
                    }
                }
                if (err.length != 0) {
                    err = "- The source and id of the educational goals need to be of type string: \n" + err;
                    return err;
                }

            }
        },

        copyright() {
            if (this.copyright != undefined) {
                // type String
                if (typeof this.copyright != "string") {
                    return "- The copyright parameter needs to be of type string.\n";
                }
            }
        },

        licence() {
            if (this.licence != undefined) {
                // type String
                if (typeof this.licence != "string") {
                    return "- The licence parameter needs to be of type string.\n";
                }
            }
        },

        content_type() {
            // required
            if (this.content_type == undefined) {
                return "- A parameter content_type is required.\n";
            }

            // type String
            if (typeof this.content_type != "string") {
                return "- The content_type parameter needs to be of type string.\n";
            }

            // existing content type
            let types = ["text/plain", "text/markdown", "text/html", "image/image", "application/pdf", "audio/mpeg"];
            if (!types.includes(this.content_type)) {
                let err = "- This content_type is not valid. Make sure the content type is one of the following: \n";
                types.forEach(type => {
                    err += "\t* " + type + " ";
                });
                return err;
            }
        },

        available() {
            // default value is true
            if (this.available == undefined) {
                this.metadata.available = true;
                return;
            }
            // type boolean
            if (typeof this.available != "boolean") {
                return "- The available parameter needs to be of type boolean.\n";
            }
        },

        target_ages() {
            if (this.target_ages != undefined) {
                // type array
                if (!Array.isArray(this.target_ages)) {
                    return "- The target_ages parameter needs to be an array of numbers.\n";
                }
                // elements are type number and in range [0,150]
                let err = "";
                for (let i = 0; i < this.target_ages.length; i++) {
                    if (typeof this.target_ages[i] != "number") {
                        err += "\t* '" + this.target_ages[i] + "' is not of type number.\n";
                    }
                    if (this.target_ages[i] < 0 || this.target_ages[i] > 150) {
                        err += "\t* '" + this.target_ages[i] + "' is not between 0 and 150.\n";
                    }
                }
                if (err.length != 0) {
                    err = "- The target_ages parameter needs to be an array of numbers between 0 and 150: \n" + err;
                    return err;
                }
            }
        },

        difficulty() {
            if (this.difficulty != undefined) {
                // type number
                if (typeof this.difficulty != "number") {
                    return "- The difficulty needs to be of type number.\n";
                }
                // in range [0,10]
                if (this.difficulty < 0 || this.difficulty > 10) {
                    return "- The difficulty needs to be between 0 and 10.\n";
                }
            }
        },

        return_value() {
            if (this.return_value != undefined) {

                // return value needs callback url and schema
                if (!this.return_value.callback_url || !this.return_value.callback_schema) {
                    return "- The return_value parameter needs to be an object with a callback_url and a callback_schema."
                }

                let err = "";
                // callback_url type string
                if (typeof this.return_value.callback_url != "string") {
                    err += "- The return value needs to have a callback_url of type string.\n";
                }

                // callback_schema type object
                if (typeof this.return_value.callback_schema != "object") {
                    err += "- The return value needs to have a callback_schema of type object.\n";
                }
                if (err) {
                    return err;
                }
            }
        },

        content_location() {
            // required
            if (this.content_location == undefined) {
                return "- A parameter content_location is required.\n";
            }

            // type String
            if (typeof this.content_location != "string") {
                return "- The content_location parameter needs to be of type string.\n";
            }
        }
    }

    /**
     * Validates the metadata
     * @returns [object, boolean] - the object is the possibly updated metadata, 
     * and the boolean indicates if the validation was succesfull
     */
    validate() {
        let errors = "";
        Object.values(this.validators).map(value => {
            if (typeof value === 'function') {
                let val = value.call(this);
                if (val) {
                    errors += val;
                }
            }
        })

        if (errors && errors.length > 0) {
            let title = "Metadata errors for the learning-object "
                + (this.hruid && typeof this.hruid == "string" ? "with hruid " + this.hruid : "without a hruid");
            UserLogger.error(errors, title);
            return [this.metadata, false];

        }
        return [this.metadata, true];

    };


}

export default MetadataValidator