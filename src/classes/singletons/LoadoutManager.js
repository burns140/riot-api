const { URLS, GUN_ID_TO_NAME_MAP, GUN_NAMES } = require("../../common/Constants");
const AxiosWrapper = require("./AxiosWrapper");
const EntitlementsManager = require("./EntitlementsManager");
const User = require("./User");

/**
 * @classdesc Tracks your current loadout
 */
class LoadoutManager {
    _equippedGuns;
    _equippedSprays;
    _identity;
    _incognito;
    _skinToGunMap;

    constructor() {}

    /**
     * @description Initialize tree for guns to available skins to variants and track current loadout
     */
    async init() {
        const loadout = await this.getLoadout();
        const guns = loadout.Guns;
        const skinMap = EntitlementsManager.MySkinIdMap;
        const levelMap = EntitlementsManager.MySkinLevelIdMap;
        const chromaMap = EntitlementsManager.MyChromaIdMap;

        for (const gun of guns) {
            gun.Name = GUN_ID_TO_NAME_MAP[gun.ID.toUpperCase()];
            gun.SkinName = skinMap.get(gun.SkinID.toUpperCase());
            gun.LevelName = levelMap.get(gun.SkinLevelID.toUpperCase());
            gun.ChromaName = chromaMap.get(gun.ChromaID.toUpperCase()) || "Standard";
        }

        this._equippedGuns = guns;
        this._equippedSprays = loadout.Sprays;
        this._identity = loadout.Identity;
        this._incognito = loadout.Incognito;

        this._skinToGunMap = new Map();
        this.buildSkinToGunMap(skinMap);
        this.buildLevelToSkinMap(levelMap);
        this.buildChromaToLevelMap(chromaMap, skinMap);
    }

    /**
     * @description Get your current loadout from riot api
     * @returns {Promise<AxiosResponse>}
     */
    async getLoadout() {
        return (await AxiosWrapper.get(URLS.LOADOUT.replace("puuid", User.UserId))).data;
    }

    /**
     * @description Build the top level of tree where each gun type (i.e. vandal, phantom, melee) is mapped to it's respective skins
     * @param {BiMap} skinMap Bimap of skin <-> skinId
     */
    buildSkinToGunMap(skinMap) {
        /* Initialize root level keys of tree with gun names i.e. vandal, phantom */
        for (const name in GUN_NAMES) {
            this._skinToGunMap.set(GUN_NAMES[name], new Map());
        }

        /**
         * Iterate through every skin name to find out which gun it is for
         * Assign that skin name as a value for the correct gun type.
         * After this loop, a value would look like { vandal => { skin1: { levels: [], variants: [] }, skin2: { levels: [], variants: [] } }, phantom => .... }
         */
        skinMap.forEach((value) => {
            let key;
            for (const name in GUN_NAMES) {
                if (value.includes(GUN_NAMES[name])) {
                    key = GUN_NAMES[name];
                    break;
                }
            }

            this._skinToGunMap.get(key || "Melee").set(value, { levels: [], variants: [] });
        });
    }

    /**
     * @description Map each skin to the skin levels that are unlocked for it
     * @param {BiMap} levelMap BiMap of skinLevel <-> skinLevelId
     */
    buildLevelToSkinMap(levelMap) {
        this._skinToGunMap.forEach(value => {
            levelMap.forEach(levelMapValue => {
                value.forEach((innerValue, key) => {
                    if (levelMapValue.includes(key)) {
                        innerValue.levels.push(levelMapValue);
                        return;
                    }
                });
            });
        });
    }

    /**
     * @description Map each skin to the chromas that are unlocked for it
     * @param {BiMap} chromaMap BiMap of chroma <-> chromaId
     * @param {BiMap} skinMap BiMap of skin <-> skinId
     */
    buildChromaToLevelMap(chromaMap, skinMap) {
        const tempMap = new Map();

        skinMap.forEach(skinName => {
            tempMap.set(skinName, []);
        });

        /* Map the chromas that are available for each skin */
        tempMap.forEach((value, skinName) => {
            chromaMap.forEach(chromaName => {
                if (chromaName.includes(skinName)) {
                    tempMap.get(skinName).push(chromaName);
                    return;
                }
            })
        });

        /* Add the chromas mapped above to the full tree */
        this._skinToGunMap.forEach((skinsForEachGunMap) => {
            skinsForEachGunMap.forEach((skinName, skinNameKey) => {
                skinName.variants = tempMap.get(skinNameKey);
            });
        });
    }

    /**
     * Getters below
     */
    get EquippedGuns() {
        return this._equippedGuns;
    }

    get SkinToGunMap() {
        return this._skinToGunMap;
    }

    get Sprays() {
        return this._equippedSprays;
    }

    get Identity() {
        return this._identity;
    }
}

module.exports = new LoadoutManager();