

class User {
    _accessToken;
    _entitlementToken;
    _userId;

    constructor() {
        const { accessToken, entitlementToken, userId } = AuthenticationHandler.run();
        this._accessToken = accessToken;
        this._entitlementToken = entitlementToken;
        this._userId = userId;
    }

    static get AccessToken() {
        return this._accessToken;
    }

    static get EntitlementToken() {
        return this._entitlementToken;
    }

    static get UserId() {
        return this._userId;
    }
}

module.exports = new User();