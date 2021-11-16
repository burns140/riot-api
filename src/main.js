const User = require("./classes/models/User");

async function run() {
    await User.init();
}

run();