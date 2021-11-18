const AxiosWrapper = require("./AxiosWrapper")
const URLS = require("../../common/Constants").URLS;
const ITEM_TYPE_IDS = require("../../common/Constants").ITEM_TYPE_IDS;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const User = require("./User");
const BiMap = require("../models/BiMap");

class EntitlementsManager {
    _mySkinLevels;
    _myChromas;
    _mySkins;

    _mySkinIdMap;
    _mySkinLevelIdMap;
    _myChromaIdMap;

    constructor() {}

    async init() {
        const config = {
            headers: {
                [HEADER_FIELDS.RIOT_TOKEN]: "RGAPI-0b69981a-08f6-4f87-ae43-e96b00ae51fd"
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
        this._mySkinLevelIdMap = new BiMap();
        for (const level of this._mySkinLevels) {
            this._mySkinLevelIdMap.set(level.id, level.name);
        }
        
        this._myChromas = allSkinChromas.filter(chroma => myChromaIds.includes(chroma.id.toLowerCase()));
        this._myChromaIdMap = new BiMap();
        for (const chroma of this._myChromas) {
            this._myChromaIdMap.set(chroma.id, chroma.name);
        }

        const mySkinNames = this._mySkinLevels.map(skin => skin.name);
        this._mySkins = allSkins.filter(skin => mySkinNames.includes(skin.name));
        this._mySkinIdMap = new BiMap();
        for (const skin of this._mySkins) {
            this._mySkinIdMap.set(skin.id, skin.name);
        }

        const skinNamesNoLevels = mySkinNames.filter(name => !name.includes("Level"));

        for (const name of skinNamesNoLevels) {
            const found = allSkinChromas.find(chroma => chroma.name === name);
            if (found) {
                this._myChromaIdMap.set(found.id, found.name);
            }
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

    get MySkinIdMap() {
        return this._mySkinIdMap;
    }

    get MySkinLevelIdMap() {
        return this._mySkinLevelIdMap;
    }

    get MyChromaIdMap() {
        return this._myChromaIdMap;
    }
}

module.exports = new EntitlementsManager();