/**
 * Created by Durzo on 5/21/2016.
 */

let Axios = require("axios");
let request = require("sync-request");

class HttpService {
    static get(url) {
        return request("GET", url);
    }

    static post(url, params) {
        return Axios.post(url, params);
    }
}

module.exports = HttpService;