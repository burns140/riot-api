const AxiosWrapper = require("./AxiosWrapper")
const URLS = require("../../common/Constants").URLS;
const ITEM_TYPE_IDS = require("../../common/Constants").ITEM_TYPE_IDS;
const HEADER_FIELDS = require("../../common/Constants").HEADER_FIELDS;
const User = require("./User");
const BiMap = require("../models/BiMap");
let PROFILES;

try {
    PROFILES = require("../../resources/profiles.json")
} catch {
    PROFILES = undefined;
}

/**
 * @classdesc Track the users entitlements
 */
class EntitlementsManager {
    _mySkinIdMap;
    _mySkinLevelIdMap;
    _myChromaIdMap;

    constructor() {}

    /**
     * @description Initialize mapping for skins, skin levels, and chromas
     */
    async init() {
        const allContent = await this.getAllContent();
        const { allSkins, allSkinLevels, allSkinChromas } = this.breakAllContentIntoCategories(allContent);
        
        const allEntitlements = (await AxiosWrapper.get(URLS.GET_ENTITLEMENTS.replace("puuid", User.UserId))).data.EntitlementsByTypes;
        const mySkinIds = allEntitlements.filter(x => x.ItemTypeID === ITEM_TYPE_IDS.SKINS)[0].Entitlements.map(skin => skin.ItemID);
        const myChromaIds = allEntitlements.filter(x => x.ItemTypeID === ITEM_TYPE_IDS.SKIN_VARIANTS)[0].Entitlements.map(variant => variant.ItemID);
        const mySkinLevels = allSkinLevels.filter(skinLevel => mySkinIds.includes(skinLevel.id.toLowerCase()));
        const mySkinNames = mySkinLevels.map(skin => skin.name);

        this.createSkinLevelIdMap(mySkinLevels);
        this.createChromaIdMap(allSkinChromas, myChromaIds);
        this.createSkinIdMap(mySkinNames, allSkins);

        this.applyChromaIdForGunsWithNoVariants(allSkinChromas, mySkinNames);
    }

    /**
     * @description Get all valorant game content from Riot's api
     * @returns {object}
     */
    async getAllContent() {
        const config = {
            headers: {
                [HEADER_FIELDS.RIOT_TOKEN]: "RGAPI-b5c031d3-ff3d-4541-9d40-2b888050d30a"
            }
        }

        return (await AxiosWrapper.get(URLS.ALL_CONTENT, config)).data;
    }

    /**
     * @description Break all of the content down to separate skins, skin levels, and chromas
     * @param {object} allContent 
     * @returns {Array, Array, Array}
     */
    breakAllContentIntoCategories(allContent) {
        const allSkins = this.mapAllSkins(allContent);
        const allSkinLevels = this.mapAllSkinLevels(allContent);
        const allSkinChromas = this.mapAllSkinChromas(allContent);

        return { allSkins, allSkinLevels, allSkinChromas };
    }

    /**
     * @description Create the id-name map for skins that I own
     * @param {Array<string>} mySkinNames Names of all the skins I own
     * @param {object} allSkins All skins in the game
     */
    createSkinIdMap(mySkinNames, allSkins) {
        const mySkins = allSkins.filter(skin => mySkinNames.includes(skin.name));
        let skinsToUse = [];

        if (!!PROFILES) {
            for (const gunName in PROFILES) {
                let temp = [];
                if (PROFILES[gunName].length !== 0) {
                    const base = PROFILES[gunName].map(skinName => `${skinName}${gunName === "Melee" ? "" : ` ${gunName}`}`);
                    temp = mySkins.filter(x => base.includes(x.name));
                } else {
                    temp = mySkins.filter(x => x.name.includes(gunName));
                }

                skinsToUse = skinsToUse.concat(temp);
            }
        } else {
            skinsToUse = mySkins;
        }
        

        this._mySkinIdMap = new BiMap();
        for (const skin of skinsToUse) {
            this._mySkinIdMap.set(skin.id, skin.name);
        }
    }

    /**
     * @description Create the id-name map for skin levels that I own
     * @param {Array<string>} mySkinLevels The skin levels that I own
     */
    createSkinLevelIdMap(mySkinLevels) {
        this._mySkinLevelIdMap = new BiMap();
        for (const level of mySkinLevels) {
            this._mySkinLevelIdMap.set(level.id, level.name);
        }
    }

    /**
     * @description Create the id-name map for chromas that I own
     * @param {object} allSkinChromas All chromas in the game
     * @param {Array} myChromaIds Id's of the chromas that I own
     */
    createChromaIdMap(allSkinChromas, myChromaIds) {
        const myChromas = allSkinChromas.filter(chroma => myChromaIds.includes(chroma.id.toLowerCase()));
        this._myChromaIdMap = new BiMap();
        for (const chroma of myChromas) {
            this._myChromaIdMap.set(chroma.id, chroma.name);
        }
    }

    /**
     * @description Get the chrroma ids for guns that don't have variants.
     * The entitlement chromas only returns actual variants
     * For guns with no variants, the chroma name is simply the gun's skin name, but those don't get returned with entitlements
     * Here, we apply that chroma name and id
     * @param {object} allSkinChromas All chromas in the game
     * @param {Array<string>} mySkinNames Names of all the skins I own
     */
    applyChromaIdForGunsWithNoVariants(allSkinChromas, mySkinNames) {
        const skinNamesNoLevels = mySkinNames.filter(name => !name.includes("Level"));
        for (const name of skinNamesNoLevels) {
            const found = allSkinChromas.find(chroma => chroma.name === name);
            if (found) {
                this._myChromaIdMap.set(found.id, found.name);
            }
        }
    }

    /**
     * @description Map each skin to only its name and id
     * @param {object} allContent 
     * @returns {Array}
     */
    mapAllSkins(allContent) {
        return allContent.skins.map(skin => {
            return {
                name: skin.name,
                id: skin.id
            }
        });
    }

    /**
     * @description Map each skin level to only its name and id
     * @param {object} allContent 
     * @returns {Array}
     */
    mapAllSkinLevels(allContent) {
        return allContent.skinLevels.map(skin => {
            return {
                name: skin.name,
                id: skin.id
            }
        });
    }

    /**
     * @description Map each chroma to only its name and id
     * @param {object} allContent 
     * @returns {Array}
     */
    mapAllSkinChromas(allContent) {
        return allContent.chromas.map(chroma => {
            return {
                name: chroma.name,
                id: chroma.id
            }
        });
    }

    /**
     * Getters Below
     */
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