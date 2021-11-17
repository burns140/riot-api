const AxiosWrapper = require("../AxiosWrapper");
const URLS = require("../../common/Constants").URLS;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const USERNAME = "aphantomdolphin";
const PASSWORD = "c7eEF9!m$4demPcY";


module.exports = class AuthenticationHandler {
    static async createSession() {
        const initRequest = {
            "client_id": "play-valorant-web-prod",
            "nonce": "1",
            "redirect_uri": "https://playvalorant.com/opt_in",
            "response_type": "token id_token",
        };
    
        const response = await AxiosWrapper.post(URLS.AUTH, initRequest);
        const cookie = response.headers["set-cookie"];
        AxiosWrapper.setCookie(cookie);
    }

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

    static async getEntitlementsToken() {
        const response = await AxiosWrapper.post(URLS.ENTITLEMENTS_TOKEN, {});
        const entitlementsToken = response.data["entitlements_token"]
    
        return entitlementsToken;
    }

    static async getUserId() {
        const response = await AxiosWrapper.post(URLS.USER_INFO, {});
        const userId = response.data.sub;
    
        return userId;
    }

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