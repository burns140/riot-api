const axios = require("axios");
const CLIENT_VALUES = require("../../common/Constants").CLIENT_VALUES;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;

/**
 * @classdesc Act as a wrapper for axios instance to store cookies
 */
class AxiosWrapper {
    axiosInstance;
    config = {
        headers: {}
    }

    /**
     * @description Create the instance with any persistent settings
     */
    constructor() {
        this.axiosInstance = axios.create({ withCredentials: true });
        this.setHeaderField(HEADER_FIELDS.CLIENT_VERSION, CLIENT_VALUES.CLIENT_VERSION);
        this.setHeaderField(HEADER_FIELDS.CLIENT_PLATFORM, CLIENT_VALUES.CLIENT_PLATFORM);
    }

    /**
     * @description Add a header to the wrappers configuration
     * @param {string} fieldName 
     * @param {any} value 
     */
    setHeaderField(fieldName, value) {
        this.config.headers[fieldName] = value;
    }

    /**
     * @description Set the cookie necessary to send api requests to riot
     * @param {} cookie 
     */
    setCookie(cookie) {
        this.axiosInstance.defaults.headers.Cookie = cookie;
    }

    /**
     * @description Passthrough for axios post function
     * @param {string} url 
     * @param {any} data 
     * @param {any} config 
     * @returns {Promise<AxiosResponse>}
     */
    async post(url, data, config) {
        const response = await this.axiosInstance.post(url, data, config || this.config);
        return response;
    }

    /**
     * @description Passthrough for axios put function
     * @param {string} url 
     * @param {any} data 
     * @param {any} config 
     * @returns {Promise<AxiosResponse>}
     */
    async put(url, data, config) {
        const response = await this.axiosInstance.put(url, data, config || this.config);
        return response;
    }

    /**
     * @description Passthrough for axios get function
     * @param {string} url 
     * @param {any} config 
     * @returns {Promise<AxiosResponse>}
     */
    async get(url, config) {
        const response = await this.axiosInstance.get(url, config || this.config);
        return response;
    }
}

module.exports = new AxiosWrapper();