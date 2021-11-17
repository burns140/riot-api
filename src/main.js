const LoadoutManager = require("./classes/models/LoadoutManager");
const User = require("./classes/models/User");
const EntitlementsManager = require("./classes/static/EntitlementsManager");

async function start() {
    await User.init();
    await EntitlementsManager.init();
    await LoadoutManager.init();
}

start();