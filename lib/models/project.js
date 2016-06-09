/**
 * Created by Durzo on 5/22/2016.
 */

let File = require("./file");
// let Folder = require("./folder");

class Project {
    constructor(data) {
        this._structure = [];

        console.log("File Stuff: ", data);

        for (var i = 0; i < data.length; i++) {
            this._structure.push({
                isFile: true,
                file: new File(data[i])
            });
        }
    }

    getStructure() {
        for (var i = 0; i < this._structure.length; i++) {
            let file = this._structure[i].file.getFileInfo();
            console.log(file)
        }
    }
}


function templateData(data) {
    
}

module.exports = Project;