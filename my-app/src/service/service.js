const axios = require('axios');
const baseURL = "http://localhost:8080/";

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 9000;

async function post(url, params) {
    url += "?";
    for(let name in params) {
        url += name + "=" + encodeURIComponent(params[name]) + "&";
    }
    let formdata = new FormData();
    const rs = await axios.post(url, formdata, {"Content-Type": "application/x-www-form-urlencoded"})
    return rs;
}

async function get(url, params) {
    url += "?";
    for(let name in params) {
        url += name + "=" + encodeURIComponent(params[name]) + "&";
    }
    const rs = await axios.get(url);
    return rs;
}

export async function list(search) {
    let rs = await get("list", {...search});
    return rs;
}

export async function pass(id, evidence) {
    let rs = await post("pass", {id, evidence});
    return rs;
}

export async function reject(id, evidence) {
    let rs = await post("reject", {id, evidence});
    return rs;
}

export async function save(params) {
    let rs = await post("save", params);
    return rs;
}