/**
 * Created by Durzo on 5/21/2016.
 */

let HttpService = require("../utility/http-service");
let Exception = require("../utility/exception");
let Template = require("../../models/template");

const ENDPOINTS = {
    GET_TEMPLATE_DATA: (template) => { return "http://localhost:3000/template/" + template + "/download"; }
};

const INPUT = {
    PROJECT_NAME:'',
    USERNAME:''
};

class Install {
    constructor(settings) {
        var request = HttpService.get(ENDPOINTS.GET_TEMPLATE_DATA(settings.template));
        var response = JSON.parse(request.getBody(), "utf8");

        if (!response.templateId) return InvalidTemplateException()

        this._template = new Template(response);

        console.log(this._template.getProject());

        console.log(INPUT.PROJECT_NAME);
        console.log(INPUT.USERNAME);
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