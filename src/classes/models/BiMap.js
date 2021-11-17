module.exports = class BiMap {
    _map = new Map();
    _reverseMap = new Map();

    constructor() {}

    set(key, value) {
        this._map.set(key, value);
        this._reverseMap.set(value, key);
    }

    get(key) {
        return this._map.get(key);
    }

    forEach(callback) {
        this._map.forEach(callback);
    }

    getFromValue(value) {
        return this._reverseMap.get(value);
    }

    keys() {
        return this._map.keys();
    }

    get Map() {
        return this._map;
    }

    get ReverseMap() {
        return this._reverseMap;
    }
}