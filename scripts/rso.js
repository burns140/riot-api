const { default: axios } = require("axios");
const AUTH_URL = "https://auth.riotgames.com/api/v1/authorization";
const ENTITLEMENTS_URL = "https://entitlements.auth.riotgames.com/api/token/v1";
const USER_INFO_URL = "https://auth.riotgames.com/userinfo";
const USERNAME = "aphantomdolphin";
const PASSWORD = "c7eEF9!m$4demPcY";

class AuthenticationHandler {
    axiosInstance = axios.create({ withCredentials: true });
    headers = {};
    config = {
        headers: this.headers
    };

    constructor(){}

    async createSession() {
        const initRequest = {
            "client_id": "play-valorant-web-prod",
            "nonce": "1",
            "redirect_uri": "https://playvalorant.com/opt_in",
            "response_type": "token id_token",
        };
    
        const response = await axios.post(AUTH_URL, initRequest);
        const cookie = response.headers["set-cookie"];
        this.axiosInstance.defaults.headers.Cookie = cookie;
    }

    async getAccessToken() {
        let data = {
            "type": "auth",
            "username": USERNAME,
            "password": PASSWORD    
        }
        
        const response = await this.axiosInstance.put(AUTH_URL, data);
        const pattern = /access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)/;
        const strToMatch = response.data.response.parameters.uri;
        const matchArr = strToMatch.match(pattern);
        const accessId = matchArr[1];
    
        return accessId;
    }

    async getEntitlementsToken() {
        const response = await this.axiosInstance.post(ENTITLEMENTS_URL, {}, this.config);
        const entitlementsToken = response.data["entitlements_token"]
    
        return entitlementsToken;
    }

    async getUserId() {
        const response = await this.axiosInstance.post(USER_INFO_URL, {}, this.config);
        const userId = response.data.sub;
    
        return userId;
    }

    async run() {
        await this.createSession();

        const accessToken = await this.getAccessToken();
        this.headers["Authorization"] = `Bearer ${accessToken}`;
    
        const entitlementsToken = await this.getEntitlementsToken(accessToken);
        this.headers["X-Riot-Entitlements-JWT"] = entitlementsToken;
        
        const userId = await this.getUserId();
    }
}

new AuthenticationHandler().run();
