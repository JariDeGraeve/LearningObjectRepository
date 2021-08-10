import Ajv from "ajv"
class JsonValidator {
    constructor(schema) {
        this.ajv = new Ajv();
        this.validate = this.ajv.compile(schema)
    }

    validate(json) {
        return validate(json);
    }

    getErrors() {
        return this.validate.errors;
    }
}

export default JsonValidator