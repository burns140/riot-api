const LoadoutManager = require("./classes/singletons/LoadoutManager");
const User = require("./classes/singletons/User");
const EntitlementsManager = require("./classes/singletons/EntitlementsManager");
const Randomizer = require("./classes/static/Randomizer");
const FileManager = require("./classes/static/FileManager");

async function start() {
    FileManager.verifyAndCreateFiles();
    await User.init();
    await EntitlementsManager.init();
    await LoadoutManager.init();
    Randomizer.randomizeAllSkins();
}

start();