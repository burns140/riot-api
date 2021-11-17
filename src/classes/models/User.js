const AuthenticationHandler = require("./AuthenticationHandler");

class User {
    _accessToken;
    _entitlementsToken;
    _userId;

    constructor() {}

    async init() {
        const { accessToken, entitlementsToken, userId } = await AuthenticationHandler.getCredentials();
        this._accessToken = accessToken;
        this._entitlementsToken = entitlementsToken;
        this._userId = userId;
    }

    get AccessToken() {
        return this._accessToken;
    }

    get EntitlementsToken() {
        return this._entitlementsToken;
    }

    get UserId() {
        return this._userId;
    }
}

module.exports = new User();