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
                this._structure.push(new File(data[i]));
            } else {
                this._structure.push(new Folder(data[i]));
            }
        }
    }
}



function templateData(data) {
    
}

module.exports = Project;