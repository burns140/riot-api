const LoadoutManager = require("./classes/singletons/LoadoutManager");
const User = require("./classes/singletons/User");
const EntitlementsManager = require("./classes/singletons/EntitlementsManager");
const Randomizer = require("./classes/static/Randomizer");

async function start() {
    await User.init();
    await EntitlementsManager.init();
    await LoadoutManager.init();
    Randomizer.randomizeSkins();
}

start();