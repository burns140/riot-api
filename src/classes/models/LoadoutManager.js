const { URLS, GUN_ID_TO_NAME_MAP } = require("../../common/Constants");
const AxiosWrapper = require("../AxiosWrapper");
const { MySkinMap } = require("../static/EntitlementsManager");
const EntitlementsManager = require("../static/EntitlementsManager");
const User = require("./User");

class LoadoutManager {
    constructor() {}

    async init() {
        const loadout = (await AxiosWrapper.get(URLS.GET_LOADOUT.replace("puuid", User.UserId))).data;
        const guns = loadout.Guns;
        const skinMap = EntitlementsManager.MySkinMap;
        const levelMap = EntitlementsManager.MySkinLevelMap;
        const chromaMap = EntitlementsManager.MyChromaMap;

        for (let gun of guns) {
            gun.Name = GUN_ID_TO_NAME_MAP[gun.ID.toUpperCase()];
            gun.SkinName = skinMap.get(gun.SkinID.toUpperCase());
            gun.LevelName = levelMap.get(gun.SkinLevelID.toUpperCase());
            gun.ChromaName = chromaMap.get(gun.ChromaID.toUpperCase());
        }

        console.log(guns);
    }
}

module.exports = new LoadoutManager();