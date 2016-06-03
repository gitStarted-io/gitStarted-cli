/**
 * Created by Durzo on 5/22/2016.
 */

let Project = require("./project");

class Template {
    constructor(results) {
        this._templateName = results.templateName;
        this._templateId = results.templateId;
        this._description = results.description;
        this._tags = results.tags;
        this._version = results.version;
        this._author = results.author;
        this._command = results.command;
        if (results.files) {
            this._project = new Project(results.files);
        }
    }

    getProject() {
        return this._project;
    }

    getCommand() {
        return this._command;
    }

    generateFiles() {
        this._project.getStructure();
    }

}

module.exports = Template;