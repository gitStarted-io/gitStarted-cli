/**
 * Created by Durzo on 6/5/2016.
 */

let fs = require("fs");
// let Folder = require("../models/folder");
let FileModel = require("../models/file");

class FileIO {
    static getFiles(path, fileData) {
        let files = [];
        for (var i = 0; i < fileData.length; i++) {
            try {
                fs.accessSync(`${path}/${fileData[i].path}`, fs.F_OK);
                let content = fs.readFileSync(`${path}/${fileData[i].path}/${fileData[i].file}`, "utf8");
                let children = null;
                if (fileData[i].children) {
                    children = [];
                    for (var x = 0; x < fileData[i].children.length; x++) {
                        children.push(getChildren(`${path}/${fileData[i].path}/children/${fileData[i].children[x].path}`, fileData[i].children[x]));
                    }
                }
                let newFileData = {
                    content:content,
                    name:fileData[i].file,
                    children:children,
                    path:`${path}/${fileData[i].path}`,
                    destination:fileData[i].destination
                };
                files.push(new FileModel(newFileData));
            } catch(e) { console.log(e); }
        }
        return files;
    }
}

function getChildren(path, fileData) {
    let children = null;

    if (fileData.children) {
        children = [];
        for (var i = 0; i < fileData.children.length; i++) {
            children.push(getChildren(`${path}/children/${fileData.children[i].path}`, fileData.children[i]));
        }
    }

    let content = fs.readFileSync(`${path}/${fileData.file}`, "utf8");

    let fileInfo = {
        content:content,
        name:fileData.name,
        children:children
    };

    return new FileModel(fileInfo);
}

module.exports = FileIO;