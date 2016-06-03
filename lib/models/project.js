/**
 * Created by Durzo on 5/22/2016.
 */

let File = require("./file");
let Folder = require("./folder");

class Project {
    constructor(data) {
        this._structure = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].isFile) {
                this._structure.push({
                    isFile: true,
                    file: new File(data[i])
                });
            } else {
                this._structure.push({
                    isFile: false,
                    file: new Folder(data[i])
                });
            }
        }
    }

    getStructure() {
        for (var i = 0; i < this._structure.length; i++) {
            if (this._structure[i].isFile) {
                let file = this._structure[i].file.getFileInfo();
                console.log(file)
            } else {
                let folder = this._structure[i].file;
                console.log(folder.getFiles());
            }
        }
    }
}


function templateData(data) {
    
}

module.exports = Project;