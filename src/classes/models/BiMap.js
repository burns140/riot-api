/**
 * @classdesc Emulates a bidirectional map
 */
module.exports = class BiMap {
    _map = new Map();
    _reverseMap = new Map();

    constructor() {}

    /**
     * @description Add entry to the map and reverse map
     * @param {string} key 
     * @param {string} value 
     */
    set(key, value) {
        this._map.set(key, value);
        this._reverseMap.set(value, key);
    }

    /**
     * @description Get value from the original map
     * @param {string} key 
     * @returns {string | object}
     */
    get(key) {
        return this._map.get(key);
    }

    /**
     * @description Call forEach on the original map
     * @param {Function} callback 
     */
    forEach(callback) {
        this._map.forEach(callback);
    }

    /**
     * @description Get value from reverse map, effectively getting a key from a value
     * @param {string | object} value 
     * @returns {string | object}
     */
    getFromValue(value) {
        return this._reverseMap.get(value);
    }

    /**
     * @description Return the keys of the original map
     * @returns {object}
     */
    keys() {
        return this._map.keys();
    }

    values() {
        return this._reverseMap.keys();
    }

    /**
     * Getters are below
     */
    get Map() {
        return this._map;
    }

    get ReverseMap() {
        return this._reverseMap;
    }
}