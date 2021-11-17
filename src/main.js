const User = require("./classes/models/User");
const EntitlementsManager = require("./classes/static/EntitlementsManager");

async function run() {
    await User.init();
    await EntitlementsManager.init();
    console.log(EntitlementsManager);
}

run();