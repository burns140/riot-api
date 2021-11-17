const LoadoutManager = require("./classes/models/LoadoutManager");
const User = require("./classes/models/User");
const EntitlementsManager = require("./classes/models/EntitlementsManager");
const Randomizer = require("./classes/static/Randomizer");

async function start() {
    await User.init();
    await EntitlementsManager.init();
    await LoadoutManager.init();
    Randomizer.randomizeLoadout();
}

start();