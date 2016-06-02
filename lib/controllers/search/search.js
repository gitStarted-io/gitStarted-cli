/**
 * Created by Durzo on 5/21/2016.
 */

let HttpService = require("../utility/http-service");

const ENDPOINTS = {
    SEARCH: "http://localhost/search?term="
};

class Search {
    constructor(settings) {
        this._terms = settings.search;

        var request = HttpService.syncGet("");
    }
}

module.exports = Search;