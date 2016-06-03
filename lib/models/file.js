/**
 * Created by Durzo on 6/1/2016.
 */
    
let Constants = require('../constants/command');
let Logger = require('../controllers/utility/logger');
    
class File {
    constructor(data) {
        this._name = data.name;
        this._content = data.content;
        this._dependencies = data.dependencies;

        this._children = null;
        if (data.hasOwnProperty("children")) {
            this._children = [];
            for (let i = 0; i < data.children.length; i++) {
                this._children.push(new File(data.children[i]));
            }
        }

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
            content: generateContent(this)
        }
    }

    get name() {
        return this._name;
    }

    get content() {
        return this._content;
    }

    get children() {
        return this._children;
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
    let newTop = "";
    let newMid = "";
    let newBot = "";
    let newContent = file.content;

    if (!file.children) return file.content;

    for (let i = 0; i < file.children.length; i++) {
        if (file.children[i].top) {
            newTop = newTop + file.children[i].top;
        }
        if (file.children[i].mid) {
            newMid = newMid + file.children[i].mid;
        }
        if (file.children[i].bot) {
            newBot = newBot + file.children[i].bot;
        }
    }

    if (newContent.indexOf(Constants.TOP_CONTENT_REPLACE) > -1) {
        newContent = newContent.replace(Constants.TOP_CONTENT_REPLACE, newTop);
    }
    if (newContent.indexOf(Constants.MID_CONTENT_REPLACE) > -1) {
        newContent = newContent.replace(Constants.MID_CONTENT_REPLACE, newMid);
    }
    if (newContent.indexOf(Constants.BOTTOM_CONTENT_REPLACE) > -1) {
        newContent = newContent.replace(Constants.BOTTOM_CONTENT_REPLACE, newBot);
    }

    return newContent;
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