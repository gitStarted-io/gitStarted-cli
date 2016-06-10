/**
 * Created by Durzo on 5/21/2016.
 */

let HttpService = require("../utility/http-service");
let Exception = require("../utility/exception");
let Template = require("../../models/template");
let GitHubDownload = require("github-download");
let exec = require("exec");

const ENDPOINTS = {
    GET_TEMPLATE_DATA: (template) => { return "http://localhost:3000/template/" + template + "/download"; }
};

const INPUT = {
    PROJECT_NAME:'',
    USERNAME:''
};

class Install {
    constructor(settings) {
        var request = HttpService.syncGet(ENDPOINTS.GET_TEMPLATE_DATA(settings.template));
        var response = JSON.parse(request.getBody(), "utf8");

        console.log("BODY: " , response);

        if (!response.templateId) return InvalidTemplateException();

        this.template = new Template(response);
        
        this.template.generateTemplate((didWork) => {
            if (!didWork) return;
            // console.log("FILES: " , this.template.files[0].getFileInfo());
            console.log("OUTPUT");
            this.template.outputFiles();
        });

        
    }
    
}

function InvalidTemplateException() {
    return new Exception(
        "Invalid Template",
        "Input error.",
        "Unfortunately that template was not found.",
        "Unfortunately that template was not found."
    );
}

module.exports = Install;