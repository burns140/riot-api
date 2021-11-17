const AxiosWrapper = require("../AxiosWrapper")
const URLS = require("../../common/Constants").URLS;
const ITEM_TYPE_IDS = require("../../common/Constants").ITEM_TYPE_IDS;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const User = require("../models/User");
let allContent;

class EntitlementsManager {
    mySkinLevels;
    myChromas;
    mySkins;

    constructor(){}

    async init() {
        const config = {
            headers: {
                [HEADER_FIELDS.RIOT_TOKEN]: "RGAPI-70ff3601-b808-4050-89fa-0ff949a47e4e"
            }
        }
        allContent = (await AxiosWrapper.get(URLS.ALL_CONTENT, config)).data;

        const allSkins = this.getAllSkins();
        const allSkinLevels = this.getAllSkinLevels();
        const allSkinChromas = this.getAllSkinChromas();

        const allEntitlements = (await AxiosWrapper.get(URLS.GET_ENTITLEMENTS.replace("puuid", User.UserId))).data.EntitlementsByTypes;
        const mySkinIds = allEntitlements.filter(x => x.ItemTypeID === ITEM_TYPE_IDS.SKINS)[0].Entitlements.map(skin => skin.ItemID);
        const myChromaIds = allEntitlements.filter(x => x.ItemTypeID === ITEM_TYPE_IDS.SKIN_VARIANTS)[0].Entitlements.map(variant => variant.ItemID);
        
        this.mySkinLevels = allSkinLevels.filter(skinLevel => mySkinIds.includes(skinLevel.id.toLowerCase()));
        this.myChromas = allSkinChromas.filter(chroma => myChromaIds.includes(chroma.id.toLowerCase()));
        
        const mySkinNames = this.mySkinLevels.map(skin => skin.name);
        this.mySkins = allSkins.filter(skin => mySkinNames.includes(skin.name));
    }

    getAllSkins() {
        return allContent.skins.map(skin => {
            return {
                name: skin.name,
                id: skin.id
            }
        });
    }

    getAllSkinLevels() {
        return allContent.skinLevels.map(skin => {
            return {
                name: skin.name,
                id: skin.id
            }
        });
    }

    getAllSkinChromas() {
        return allContent.chromas.map(chroma => {
            return {
                name: chroma.name,
                id: chroma.id
            }
        });
    }
}

module.exports = new EntitlementsManager();