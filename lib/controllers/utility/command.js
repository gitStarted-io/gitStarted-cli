/**
 * Created by Durzo on 5/21/2016.
 */

let Install = require("../templates/install");
let Search = require("../search/search");

class Command {
    constructor(settings) {
        this.checkSettings(settings);
    }

    static checkSettings(settings) {
        if (settings.template) {
            return new Install(settings);
        }
        else if (settings.search) {
            return new Search(settings);
        }

        return;
    }
}

module.exports = Command;