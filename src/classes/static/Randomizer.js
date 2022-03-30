const { GUN_IDS, GUN_NAMES, STANDARD_CHROMAS, URLS } = require("../../common/Constants");
const AxiosWrapper = require("../singletons/AxiosWrapper");
const EntitlementsManager = require("../singletons/EntitlementsManager");
const LoadoutManager = require("../singletons/LoadoutManager");
const User = require("../singletons/User");
let GUNS_TO_RANDOMIZE;

/**
 * @classdesc Do any randomizing of in game items
 */
module.exports = class Randomizer {
    /**
     * @description Randomize skins for every gun
     */
    static randomizeAllSkins() {
        GUNS_TO_RANDOMIZE = require("../../resources/config.json").GUNS_TO_RANDOMIZE;

        const skinToGunMap = LoadoutManager.SkinToGunMap;
        const randomizedGunNameToSkinName = new Map();

        /**
         * Randomly selects the skin for each gun type
         */
        skinToGunMap.forEach((levelVariantPair, gunType) => {
            const skinNames = [...levelVariantPair.keys()];
            const randomIndex = Math.floor(Math.random() * skinNames.length);
            const randomSkinName = skinNames[randomIndex];

            randomizedGunNameToSkinName.set(gunType, randomSkinName);
        });

        /**
         * Build the final map that will contain all dtos
         */
        const randomWithIdMap = new Map();
        randomizedGunNameToSkinName.forEach((skinName, gunName) => {
            const dto = {};
            randomWithIdMap.set(GUN_IDS[gunName.toUpperCase()], dto);

            this.setGunAndSkinValuesForDTO(dto, skinName, gunName);
            this.setLevelValuesForDTO(skinToGunMap, dto, skinName, gunName);
            this.setChromaValuesForDTO(skinToGunMap, dto, skinName, gunName);
        });

        this.sendRequestToRandomize(randomWithIdMap);
    }

    /**
     * @description Set the chroma id and chroma name for data to be used in final request
     * @param {Map} skinToGunMap 
     * @param {object} dto 
     * @param {string} skinName 
     * @param {string} gunName 
     */
    static setChromaValuesForDTO(skinToGunMap, dto, skinName, gunName) {
        const chromaMap = EntitlementsManager.MyChromaIdMap;
        const availableVariants = skinToGunMap.get(gunName).get(skinName).variants;
        if (availableVariants.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableVariants.length);
            const randomVariantName = availableVariants[randomIndex];
            const randomVariantId = chromaMap.getFromValue(randomVariantName);
            dto.chromaId = randomVariantId;
            dto.chromaName = randomVariantName;
        } else {
            dto.chromaId = undefined;
            dto.chromaName = skinName;
        }

        /* Handles the case where a gun did not have a chroma that matched it's own name */
        if (dto.chromaId === undefined) {
            if (gunName !== GUN_NAMES.OPERATOR) {
                const gunId = GUN_IDS[gunName.toUpperCase()];
                dto.chromaId = STANDARD_CHROMAS[gunId];
            } else {
                if (dto.chromaName === "Nitro Operator") {
                    dto.chromaId = STANDARD_CHROMAS["NITRO_OPERATOR"];
                } else {
                    dto.chromaId = STANDARD_CHROMAS["GENESIS_OPERATOR"];
                }
            }
        }
    }

    /**
     * @description Set gun id, gun name, skin id, and skin name for data to be used in final request
     * @param {object} dto 
     * @param {string} skinName 
     * @param {string} gunName 
     */
    static setGunAndSkinValuesForDTO(dto, skinName, gunName) {
        const skinMap = EntitlementsManager.MySkinIdMap;
        const skinId = skinMap.getFromValue(skinName);
        dto.gunId = GUN_IDS[gunName.toUpperCase()];
        dto.gunName = gunName;
        dto.skinId = skinId;
        dto.skinName = skinName;
    }

    /**
     * @description Set level id and level name for data to be used in final request
     * @param {Map} skinToGunMap 
     * @param {object} dto 
     * @param {string} skinName 
     * @param {string} gunName 
     */
    static setLevelValuesForDTO(skinToGunMap, dto, skinName, gunName) {
        const levelMap = EntitlementsManager.MySkinLevelIdMap;
        const availableLevels = skinToGunMap.get(gunName).get(skinName).levels;
        const maxLevel = availableLevels[availableLevels.length - 1];
        const maxLevelId = levelMap.getFromValue(maxLevel);
        dto.levelId = maxLevelId;
        dto.levelName = maxLevel;
    }

    /**
     * @description Send the request to riot's endpoint to randomize loadout
     * @param {Map} randomizedMap 
     */
    static async sendRequestToRandomize(randomizedMap) {
        const guns = [];
        this.buildGunArray(guns, randomizedMap);
        const data = {
            Guns: guns,
            Sprays: LoadoutManager.Sprays,
            Identity: LoadoutManager.Identity
        };

        console.log(guns);

        const res = (await AxiosWrapper.put(URLS.LOADOUT.replace("puuid", User.UserId), data));
        console.log(res);
    }

    /**
     * @description Builds the object for each gun that will be sent in the actual endpoint request. Excludes values that aren't guids
     * @param {Array} guns 
     * @param {Map} randomizedMap 
     */
    static buildGunArray(guns, randomizedMap) {
        randomizedMap.forEach((skinInfo, gunId) => {
            let thisGun;
            if (GUNS_TO_RANDOMIZE.includes(skinInfo.gunName) || GUNS_TO_RANDOMIZE.length === 0) {
                thisGun = {
                    ID: gunId,
                    SkinID: skinInfo.skinId,
                    SkinLevelID: skinInfo.levelId,
                    ChromaID: skinInfo.chromaId,
                    Attachments: []
                };
            } else {
                const gunToUse = LoadoutManager.EquippedGuns.find(x => x.Name === skinInfo.gunName);
                thisGun = {
                    ID: gunToUse.ID,
                    SkinID: gunToUse.SkinID,
                    SkinLevelID: gunToUse.SkinLevelID,
                    ChromaID: gunToUse.ChromaID,
                    Attachments: []
                }
            }
            guns.push(thisGun);
        });

        for (const gun of LoadoutManager.EquippedGuns) {
            if (gun.hasOwnProperty("CharmInstanceID")) {
                const gunForReq = guns.find(x => x.ID.toLowerCase() === gun.ID.toLowerCase());
                gunForReq.CharmInstanceID = gun.CharmInstanceID;
                gunForReq.CharmID = gun.CharmID;
                gunForReq.CharmLevelID = gun.CharmLevelID;
            }
        }
    }
}