/**
 * Created by Durzo on 6/1/2016.
 */

let Constants = require("../constants/command");
let File = require("./file");

class Folder {
    constructor(data) {
        this._name = data.name;
        this._files = [];

        for (var i = 0; i < data.children.length; i++) {
            if (data.children[i].isFile) {
                this._files.push({
                    isFile: true,
                    file:new File(data.children[i])
                });
            } else {
                this._files.push({
                    isFile: false,
                    file: new Folder(data.children[i])
                });
            }
        }
    }

    getFiles() {
        return {
            name: this._name,
            children:this._files.map((file) => {
                if (file.isFile) {
                    return file.file.getFileInfo();
                } else {
                    return file.file.getFiles();
                }
            })
        }
    }
}

module.exports = Folder;