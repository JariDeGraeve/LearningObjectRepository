import fs from "fs";
import path from "path"

class UserLogger {
    static userLogger = 0;
    static stream = fs.createWriteStream(path.resolve("user.log"), { flags: "a" });

    static info(message, title) {
        if (this.userLogger === 0) {
            this.userLogger = new UserLogger();
        }
        // use toUTCString() for a timestamp like 'Thu, 29 Jul 2021 15:08:24 GMT'
        // use toISOString() for a timestamp like '2021-07-29T15:06:28.749Z'
        message = (new Date()).toISOString() + " [INFO]: " + (title ? title + "\n" : "") + message + "\n"
            + (message.charAt(message.length - 1) == "\n" ? "" : "\n");
        try {
            this.stream.write(message);
        } catch (e) {
            console.log(e);
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log(message.trimRight("\n"));
        }

    }

    static error(message, title) {
        if (this.userLogger === 0) {
            this.userLogger = new UserLogger();
        }
        // use toUTCString() for a timestamp like 'Thu, 29 Jul 2021 15:08:24 GMT'
        // use toISOString() for a timestamp like '2021-07-29T15:06:28.749Z'
        message = (new Date()).toISOString() + " [ERROR]: " + (title ? title + "\n" : "") + message + "\n"
            + (message.charAt(message.length - 1) == "\n" ? "" : "\n");
        try {
            this.stream.write(message);
        } catch (e) {
            console.log(e);
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log(message.trimRight("\n"));
        }
    }
}

export default UserLogger;