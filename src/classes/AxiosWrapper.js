const axios = require("axios");
const CLIENT_VALUES = require("../common/Constants").CLIENT_VALUES;
const HEADER_FIELDS = require("../common/Constants").HEADER_FIELDS;

class AxiosWrapper {
    axiosInstance;
    config = {
        headers: {}
    }

    constructor() {
        this.axiosInstance = axios.create({ withCredentials: true });
        this.setHeaderField(HEADER_FIELDS.CLIENT_VERSION, CLIENT_VALUES.CLIENT_VERSION);
        this.setHeaderField(HEADER_FIELDS.CLIENT_PLATFORM, CLIENT_VALUES.CLIENT_PLATFORM);
    }

    setHeaderField(fieldName, value) {
        this.config.headers[fieldName] = value;
    }

    setCookie(cookie) {
        this.axiosInstance.defaults.headers.Cookie = cookie;
    }

    async post(url, data, config) {
        const response = await this.axiosInstance.post(url, data, config || this.config);
        return response;
    }

    async put(url, data, config) {
        const response = await this.axiosInstance.put(url, data, config || this.config);
        return response;
    }

    async get(url, config) {
        const response = await this.axiosInstance.get(url, config || this.config);
        return response;
    }
}

module.exports = new AxiosWrapper();