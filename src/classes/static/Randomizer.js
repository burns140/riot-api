const { GUN_IDS } = require("../../common/Constants");
const EntitlementsManager = require("../models/EntitlementsManager");
const LoadoutManager = require("../models/LoadoutManager")

module.exports = class Randomizer {
    static randomizeLoadout() {
        const equippedGuns = LoadoutManager.EquippedGuns;
        const map = LoadoutManager.SkinToGunMap;

        const randomized = new Map();

        map.forEach((value, key) => {
            const skinNames = [ ...value.keys() ];
            const randomIndex = Math.floor(Math.random() * skinNames.length);
            const randomSkinName = skinNames[randomIndex];

            randomized.set(key, randomSkinName);
        });

        console.log(randomized);
        const randomWithIdMap = new Map();
        const skinMap = EntitlementsManager.MySkinMap;
        randomized.forEach((skinName, gunName) => {
            let skinId;

            skinMap.forEach((innerSkinName, innerSkinId) => {
                if (skinName === innerSkinName) {
                    skinId = innerSkinId;
                    return;
                }
            });

            randomWithIdMap.set(GUN_IDS[gunName.toUpperCase()], skinId);
        });

        console.log(randomWithIdMap);
    }
}