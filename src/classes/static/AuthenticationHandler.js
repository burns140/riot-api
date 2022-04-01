const { default: axios } = require("axios");
const AxiosWrapper = require("../singletons/AxiosWrapper");
const URLS = require("../../common/Constants").URLS;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const CLIENT_VALUES = require("../../common/Constants").CLIENT_VALUES;

let AUTH;
let USERNAME;
let PASSWORD;

/**
 * @classdesc Get the tokens and cookies necessary for requests to the client api
 */
module.exports = class AuthenticationHandler {

    /**
     * @description Initialize session to get cookie necessary for later requests
     */
    static async createSession() {
        AUTH = require("../../resources/auth.json");
        USERNAME = AUTH.USERNAME || "YOUR_USERNAME_HERE";
        PASSWORD = AUTH.PASSWORD || "YOUR_PASSWORD_HERE";

        const initRequest = {
            "client_id": "play-valorant-web-prod",
            "nonce": "1",
            "redirect_uri": "https://playvalorant.com/opt_in",
            "response_type": "token id_token",
            "scope": "account openid"
        };

        const response = await AxiosWrapper.post(URLS.AUTH, initRequest, { withCredentials: true });
        const cookie = response.headers["set-cookie"];
        AxiosWrapper.setCookie(cookie);
    }

    /**
     * @description Send request to Riot auth endpoint to get the access token
     * @returns {Promise<string>} access token
     */
    static async getAccessToken() {
        let data = {
            "type": "auth",
            "username": USERNAME,
            "password": PASSWORD,
            "remember": true,
            "language": "en_US"
        }

        const response = await AxiosWrapper.put(URLS.AUTH, data);
        const pattern = /access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)/;
        const strToMatch = response.data.response.parameters.uri;
        const accessId = strToMatch.match(pattern)[1];

        return accessId;
    }

    /**
     * @description Send request to Riot auth endpoint to get entitlements token
     * @returns {Promise<string>} entitlements token
     */
    static async getEntitlementsToken() {
        const response = await AxiosWrapper.post(URLS.ENTITLEMENTS_TOKEN, {});
        const entitlementsToken = response.data["entitlements_token"]

        return entitlementsToken;
    }

    /**
     * @description Send request to Riot user info endpoint to get user id
     * @returns {Promise<string>} user id
     */
    static async getUserId() {
        const response = await AxiosWrapper.post(URLS.USER_INFO, {});
        const userId = response.data.sub;

        return userId;
    }

    /**
     * @description Get all the credentials necessary to make requests to Riot's client endpoint
     * @returns {Promise<string, string, string>}
     */
    static async getCredentials() {
        await this.createSession();

        const accessToken = await this.getAccessToken();
        AxiosWrapper.setHeaderField(HEADER_FIELDS.AUTH, `Bearer ${accessToken}`);

        const entitlementsToken = await this.getEntitlementsToken(accessToken);
        AxiosWrapper.setHeaderField(HEADER_FIELDS.ENTITLEMENTS, entitlementsToken);

        const userId = await this.getUserId();
        return { accessToken, entitlementsToken, userId };
    }
}