/**
 * Created by Durzo on 5/22/2016.
 */

let Project = require("./project");

class Template {
    constructor(results) {
        console.log("HERE");
        this._templateName = results.templateName;
        this._templateId = results.templateId;
        this._description = results.description;
        this._tags = results.tags;
        this._version = results.version;
        this._author = results.author;
        this._command = results.command;
        if (results.files) {
            this._project = new Project(results.package);
        }
    }

    getProject() {
        console.log("TEST");
        return this._project;
    }

    getCommand() {
        return this._command;
    }

}

module.exports = Template;