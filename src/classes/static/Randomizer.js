const { GUN_IDS, GUN_NAMES, STANDARD_CHROMAS } = require("../../common/Constants");
const EntitlementsManager = require("../singletons/EntitlementsManager");
const LoadoutManager = require("../singletons/LoadoutManager")

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
                console.log(`undefined: ${skinName}`);
                obj.chromaId = undefined;
                obj.chromaName = skinName;
            }

            if (obj.chromaId === undefined) {
                if (gunName !== GUN_NAMES.OPERATOR) {
                    const gunId = GUN_IDS[gunName.toUpperCase()];
                    obj.chromaId = STANDARD_CHROMAS[gunId];
                }
            }
        });

        console.log(randomWithIdMap);
    }
}