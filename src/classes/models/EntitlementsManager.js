const AxiosWrapper = require("../AxiosWrapper")
const URLS = require("../../common/Constants").URLS;
const ITEM_TYPE_IDS = require("../../common/Constants").ITEM_TYPE_IDS;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const User = require("./User");

class EntitlementsManager {
    _mySkinLevels;
    _myChromas;
    _mySkins;

    _mySkinMap;
    _mySkinLevelMap;
    _myChromaMap;

    constructor() {}

    async init() {
        const config = {
            headers: {
                [HEADER_FIELDS.RIOT_TOKEN]: "RGAPI-70ff3601-b808-4050-89fa-0ff949a47e4e"
            }
        }
        const allContent = (await AxiosWrapper.get(URLS.ALL_CONTENT, config)).data;

        const allSkins = this.mapAllSkins(allContent);
        const allSkinLevels = this.mapAllSkinLevels(allContent);
        const allSkinChromas = this.mapAllSkinChromas(allContent);

        const allEntitlements = (await AxiosWrapper.get(URLS.GET_ENTITLEMENTS.replace("puuid", User.UserId))).data.EntitlementsByTypes;
        const mySkinIds = allEntitlements.filter(x => x.ItemTypeID === ITEM_TYPE_IDS.SKINS)[0].Entitlements.map(skin => skin.ItemID);
        const myChromaIds = allEntitlements.filter(x => x.ItemTypeID === ITEM_TYPE_IDS.SKIN_VARIANTS)[0].Entitlements.map(variant => variant.ItemID);
        
        this._mySkinLevels = allSkinLevels.filter(skinLevel => mySkinIds.includes(skinLevel.id.toLowerCase()));
        this._mySkinLevelMap = new Map();
        for (const level of this._mySkinLevels) {
            this._mySkinLevelMap.set(level.id, level.name);
        }
        
        this._myChromas = allSkinChromas.filter(chroma => myChromaIds.includes(chroma.id.toLowerCase()));
        this._myChromaMap = new Map();
        for (const chroma of this._myChromas) {
            this._myChromaMap.set(chroma.id, chroma.name);
        }

        const mySkinNames = this._mySkinLevels.map(skin => skin.name);
        this._mySkins = allSkins.filter(skin => mySkinNames.includes(skin.name));
        this._mySkinMap = new Map();
        for (const skin of this._mySkins) {
            this._mySkinMap.set(skin.id, skin.name);
        }
    }

    mapAllSkins(allContent) {
        return allContent.skins.map(skin => {
            return {
                name: skin.name,
                id: skin.id
            }
        });
    }

    mapAllSkinLevels(allContent) {
        return allContent.skinLevels.map(skin => {
            return {
                name: skin.name,
                id: skin.id
            }
        });
    }

    mapAllSkinChromas(allContent) {
        return allContent.chromas.map(chroma => {
            return {
                name: chroma.name,
                id: chroma.id
            }
        });
    }

    get MySkins() {
        return this._mySkins;
    }

    get MySkinLevels() {
        return this._mySkinLevels;
    }

    get MyChromas() {
        return this._myChromas;
    }

    get MySkinMap() {
        return this._mySkinMap;
    }

    get MySkinLevelMap() {
        return this._mySkinLevelMap;
    }

    get MyChromaMap() {
        return this._myChromaMap;
    }
}

module.exports = new EntitlementsManager();