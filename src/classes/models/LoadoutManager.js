const { URLS, GUN_ID_TO_NAME_MAP, GUN_NAMES } = require("../../common/Constants");
const AxiosWrapper = require("../AxiosWrapper");
const EntitlementsManager = require("../static/EntitlementsManager");
const User = require("./User");

class LoadoutManager {
    _equippedGuns;
    _skinToGunMap;

    constructor() {}

    async init() {
        const loadout = (await AxiosWrapper.get(URLS.GET_LOADOUT.replace("puuid", User.UserId))).data;
        const guns = loadout.Guns;
        const skinMap = EntitlementsManager.MySkinMap;
        const levelMap = EntitlementsManager.MySkinLevelMap;
        const chromaMap = EntitlementsManager.MyChromaMap;

        for (const gun of guns) {
            gun.Name = GUN_ID_TO_NAME_MAP[gun.ID.toUpperCase()];
            gun.SkinName = skinMap.get(gun.SkinID.toUpperCase());
            gun.LevelName = levelMap.get(gun.SkinLevelID.toUpperCase());
            gun.ChromaName = chromaMap.get(gun.ChromaID.toUpperCase());
        }

        this._equippedGuns = guns;
        // console.log(this._equippedGuns);

        this._skinToGunMap = new Map();
        this.buildSkinToGunMap(skinMap);
        this.buildLevelToSkinMap(levelMap);
        this.buildChromaToLevelMap(chromaMap, skinMap);
    }

    buildSkinToGunMap(skinMap) {
        for (const name in GUN_NAMES) {
            this._skinToGunMap.set(GUN_NAMES[name], new Map());
        }

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

    buildChromaToLevelMap(chromaMap, skinMap) {
        const tempMap = new Map();

        skinMap.forEach(value => {
            tempMap.set(value, []);
        });

        tempMap.forEach((value, key) => {
            chromaMap.forEach(chromaValue => {
                if (chromaValue.includes(key)) {
                    tempMap.get(key).push(chromaValue);
                    return;
                }
            })
        });

        this._skinToGunMap.forEach((skinsForEachGunMap, key) => {
            skinsForEachGunMap.forEach((innerValue, innerKey) => {
                innerValue.variants = tempMap.get(innerKey);
            });
        });
    }
}

module.exports = new LoadoutManager();