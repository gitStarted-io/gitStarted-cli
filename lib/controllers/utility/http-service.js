/**
 * Created by Durzo on 5/21/2016.
 */

let Axios = require("axios");
let request = require("sync-request");

class HttpService {
    static syncGet(url) {
        return request("GET", url);
    }

    static get(url, params = null) {
        return Axios.get(url, params);
    }

    static post(url, params = null) {
        return Axios.post(url, params);
    }
}

module.exports = HttpService;