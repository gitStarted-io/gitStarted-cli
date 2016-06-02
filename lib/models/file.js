/**
 * Created by Durzo on 6/1/2016.
 */
    
let Constants = require('../constants/command');
    
class File {
    constructor(data) {
        this._name = data.name;
        this._content = data.content;
        this._dependencies = data._dependencies;

        getSpecialContent(this._content, (special) => {
           this._topContent =  special.top;
            this._middleContent = special.mid;
            this._bottomContent = special.bot;
        });

        this._children = null;
        if (data.hasOwnProperty("children")) {
            this._children = [];
            for (let i = 0; i < children.length; i++) {
                this._children = new File(children[i]);
            }
        }
    }

    getFileInfo() {
        return {
            name:this._name,
            dependencies: this._dependencies,
            content: generateContent(this)
        }
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

    if (newContent.indexOf(Constants.TOP_CONTENT) > -1) {
        newContent.replace(Constants.TOP_CONTENT, newTop);
    }
    if (newContent.indexOf(Constants.MID_CONTENT) > -1) {
        newContent.replace(Constants.MID_CONTENT, newMid);
    }
    if (newContent.indexOf(Constants.BOTTOM_CONTENT) > -1) {
        newContent.replace(Constants.BOTTOM_CONTENT, newBot);
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