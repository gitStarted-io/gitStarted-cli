/**
 * Created by Durzo on 5/22/2016.
 */

class Exception {
    constructor(name, level, message, html) {
        throw {
            name: name,
            level: level,
            message: message,
            htmlMessage: html,
            toString: function () {
                return name + ": " + message;
            }
        };
    }
}

module.exports = Exception;