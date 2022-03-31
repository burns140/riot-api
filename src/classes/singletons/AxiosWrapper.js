const axios = require("axios");
const CLIENT_VALUES = require("../../common/Constants").CLIENT_VALUES;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const { Agent } = require("https");

const ciphers = [
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256',
    'TLS_AES_256_GCM_SHA384',
];

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
        const agent = new Agent({ ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' })
        this.axiosInstance = axios.create({ withCredentials: true, httpsAgent: agent });
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
        console.log("setting cookie");
        console.log(cookie);
        document.cookie = cookie;
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
        let response = "";
        try {
            response = await this.axiosInstance.post(url, data, config || this.config);
        } catch (e) {
            console.log(e);
        }
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