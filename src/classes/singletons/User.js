const AuthenticationHandler = require("../static/AuthenticationHandler");

/**
 * @classdesc Track/store the users tokens and id
 */
class User {
    _accessToken;
    _entitlementsToken;
    _userId;

    constructor() {}

    /**
     * @description Initialize the access token, entitlements token, and user id
     */
    async init() {
        const { accessToken, entitlementsToken, userId } = await AuthenticationHandler.getCredentials();
        this._accessToken = accessToken;
        this._entitlementsToken = entitlementsToken;
        this._userId = userId;

        console.log(this._userId);
    }

    /**
     * Getters below
     */
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