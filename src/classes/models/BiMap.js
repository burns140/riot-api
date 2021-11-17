module.exports = class BiMap {
    map = new Map();
    reverseMap = new Map();

    constructor() {}

    set(key, value) {
        this.map.set(key, value);
        this.reverseMap.set(value, key);
    }

    get(key) {
        return this.map.get(key);
    }

    getFromValue(value) {
        return this.reverseMap.get(value);
    }
}