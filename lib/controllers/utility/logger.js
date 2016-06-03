/**
 * Created by Durzo on 6/2/2016.
 */

let chalk = require("chalk");

class Logger {
    static important(message) {
        console.log(chalk.yellow(message));
    }

    static error(message) {
        console.log(chalk.red(message));
    }

    static success(message) {
        console.log(chalk.green(message));
    }
}

module.exports = Logger;