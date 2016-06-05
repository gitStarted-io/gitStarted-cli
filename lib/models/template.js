/**
 * Created by Durzo on 5/22/2016.
 */

let Project = require("./project");
let File = require("./file");
let GitHubDownloader = require("github-download");
let fs = require("fs");
let Logger = require("../controllers/utility/logger");
let FileIO = require("../utility/file-io");

class Template {
    constructor(results) {
        this._templateName = results.templateName;
        this._templateId = results.templateId;
        this._description = results.description;
        this._tags = results.tags;
        this._version = results.version;
        this._author = results.author;
        this._command = results.command;
        this._repo = results.repo;
        this._fileData = results.files;
        this._files = [];

            getRepo(this._repo[0], (path) => {
                if (!path) {
                    Logger.error("Failed to get repository");
                } else {
                    let files = FileIO.getFiles(path, this._fileData);
                    console.log(files[0].getFileInfo());
                    removeRepo(path);
                }
            });
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

function getRepo(url, callback) {
    GitHubDownloader(url, "temp")
        .on('dir', function(dir) {
            console.log("DIR: " , dir);
        })
        .on('file', function(file) {
            console.log(file);
        })
        .on('zip', function(zipUrl) { //only emitted if Github API limit is reached and the zip file is downloaded
            console.log(zipUrl);
        })
        .on('error', function(err) {
            callback(null);
        })
        .on('end', function() {
            callback("temp");
        });
}

function removeRepo(path) {
    fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
            removeRepo(curPath);
        } else { // delete file
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(path);
}

module.exports = Template;