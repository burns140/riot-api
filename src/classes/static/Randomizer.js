const { GUN_IDS, GUN_NAMES, STANDARD_CHROMAS, URLS } = require("../../common/Constants");
const AxiosWrapper = require("../singletons/AxiosWrapper");
const EntitlementsManager = require("../singletons/EntitlementsManager");
const LoadoutManager = require("../singletons/LoadoutManager");
const User = require("../singletons/User");

module.exports = class Randomizer {
    static randomizeSkins() {
        const map = LoadoutManager.SkinToGunMap;

        const randomized = new Map();

        map.forEach((value, key) => {
            const skinNames = [ ...value.keys() ];
            const randomIndex = Math.floor(Math.random() * skinNames.length);
            const randomSkinName = skinNames[randomIndex];

            randomized.set(key, randomSkinName);
        });

        const randomWithIdMap = new Map();
        const skinMap = EntitlementsManager.MySkinIdMap;
        const levelMap = EntitlementsManager.MySkinLevelIdMap;
        const chromaMap = EntitlementsManager.MyChromaIdMap;
        const skinToGunMap = LoadoutManager.SkinToGunMap;
        // console.log(randomized);
        randomized.forEach((skinName, gunName) => {
            const obj = {};
            randomWithIdMap.set(GUN_IDS[gunName.toUpperCase()], obj);

            const skinId = skinMap.getFromValue(skinName);
            obj.gunId = GUN_IDS[gunName.toUpperCase()];
            obj.gunName = gunName;
            obj.skinId = skinId;
            obj.skinName = skinName;

            const availableLevels = skinToGunMap.get(gunName).get(skinName).levels;
            const maxLevel = availableLevels[availableLevels.length - 1];
            const maxLevelId = levelMap.getFromValue(maxLevel);
            obj.levelId = maxLevelId;
            obj.levelName = maxLevel;

            const availableVariants = skinToGunMap.get(gunName).get(skinName).variants;
            if (availableVariants.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableVariants.length);
                const randomVariantName = availableVariants[randomIndex];
                const randomVariantId = chromaMap.getFromValue(randomVariantName);
                obj.chromaId = randomVariantId;
                obj.chromaName = randomVariantName;
            } else {
                // console.log(`undefined: ${skinName}`);
                obj.chromaId = undefined;
                obj.chromaName = skinName;
            }

            if (obj.chromaId === undefined) {
                if (gunName !== GUN_NAMES.OPERATOR) {
                    const gunId = GUN_IDS[gunName.toUpperCase()];
                    obj.chromaId = STANDARD_CHROMAS[gunId];
                } else {
                    if (obj.chromaName === "Nitro Operator") {
                        obj.chromaId = STANDARD_CHROMAS["NITRO_OPERATOR"];
                    } else {
                        obj.chromaId = STANDARD_CHROMAS["GENESIS_OPERATOR"];
                    }
                }
            }
        });

        // console.log(randomWithIdMap);
        this.sendRequest(randomWithIdMap);
    }

    static async sendRequest(randomizedMap) {
        const guns = [];

        this.buildGunArray(guns, randomizedMap);
        
        const data = {
            Guns: guns,
            Sprays: LoadoutManager.Sprays,
            Identity: LoadoutManager.Identity
        };

        const res = (await AxiosWrapper.put(URLS.LOADOUT.replace("puuid", User.UserId), data));
    }

    static buildGunArray(guns, randomizedMap) {
        randomizedMap.forEach((skinInfo, gunId) => {
            const thisGun = {
                ID: gunId,
                SkinID: skinInfo.skinId,
                SkinLevelID: skinInfo.levelId,
                ChromaID: skinInfo.chromaId,
                Attachments: []
            };

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