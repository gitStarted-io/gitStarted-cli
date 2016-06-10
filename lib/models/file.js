/**
 * Created by Durzo on 6/1/2016.
 */
    
let Constants = require('../constants/command');
let Logger = require('../controllers/utility/logger');
// let FileIO = require("../utility/file-io");
    
class File {
    constructor(data) {
        this._name = data.name;
        this._content = data.content;
        this._dependencies = data.dependencies;
        this._destination = data.destination;
        this._path = data.path;

        this._children = data.children;

        getSpecialContent(generateContent(this), (special) => {
            this._topContent =  special.top;
            this._middleContent = special.mid;
            this._bottomContent = special.bot;
        });
    }

    getFileInfo() {
        return {
            name:this._name,
            dependencies: this._dependencies,
            content: generateContent(this),
            destination: this._destination
        }
    }

    get name() {
        return this._name;
    }

    get content() {
        return this._content;
    }

    get destination() {
        return this._destination;
    }

    get children() {
        return this._children;
    }

    get path() {
        return this._path;
    }

    get top() {
        return this._topContent;
    }

    get mid() {
        return this._middleContent;
    }

    get bot() {
        return this._bottomContent;
    }
}

function generateContent(file) {
    let keys = {};
    let newContent = file.content + "";
    let replacements = getIndicesOf(Constants.REPLACE, file.content, true);
    for (var i = 0; i < replacements.length; i++) {
        let end = getPosition(file.content, "]]]", i+1);
        if (end > replacements[i]) { // Valid.
            let str = file.content.substring(replacements[i] + Constants.REPLACE.length, end);
            keys[str] = "";
        }
    }

    let keysArr = Object.keys(keys);
    
    if (!file.children) return file.content;

    for (let i = 0; i < file.children.length; i++) {
        let content = file.children[i].getFileInfo().content;
        for (let x = 0; x < keysArr.length; x++) {
            let start = content.indexOf(`${Constants.PLACEHOLDER}${keysArr[x]}]]]`) + `${Constants.PLACEHOLDER}${keysArr[x]}]]]`.length;
            let end = content.indexOf(`${Constants.PLACEHOLDER_END}${keysArr[x]}]]]`);
            let str = "";
            if (start > 0 && end > 0 && end > start) {
                str += content.substring(start, end);
            }
            keys[keysArr[x]] += str;
        }
    }

    for (let i = 0; i < keysArr.length; i++) {
        newContent = newContent.replace(`${Constants.REPLACE}${keysArr[i]}]]]`, keys[keysArr[i]]);
    }

    return newContent;
}

function log(filedata, str) {
    if (filedata.name === "index.js") {
        console.log(str);
    }
}

function getIndicesOf(searchStr, str, caseSensitive = false) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function getPosition(str, target, count) {
    return str.split(target, count).join(target).length;
}

function getSpecialContent(content, callback) {
    let foundContent = {
        top:null,
        mid:null,
        bot:null
    };

    if (content.indexOf(Constants.TOP_CONTENT) > -1 && content.indexOf(Constants.TOP_CONTENT_DONE) > -1) {
        foundContent.top = content.substring((content.indexOf(Constants.TOP_CONTENT) + (Constants.TOP_CONTENT.length)), content.indexOf(Constants.TOP_CONTENT_DONE));
    }
    if (content.indexOf(Constants.MID_CONTENT) > -1 && content.indexOf(Constants.MID_CONTENT_DONE) > -1) {
        foundContent.mid = content.substring((content.indexOf(Constants.MID_CONTENT) + (Constants.MID_CONTENT.length)), content.indexOf(Constants.MID_CONTENT_DONE));
    }
    if (content.indexOf(Constants.BOTTOM_CONTENT) > -1 && content.indexOf(Constants.BOTTOM_CONTENT_DONE) > -1) {
        foundContent.mid = content.substring((content.indexOf(Constants.BOTTOM_CONTENT) + (Constants.BOTTOM_CONTENT.length)), content.indexOf(Constants.BOTTOM_CONTENT_DONE));
    }

    callback(foundContent);
}

module.exports = File;