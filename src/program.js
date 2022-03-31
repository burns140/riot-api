const User = require("./classes/singletons/User");

async function start() {
    console.log("in the thing");

    await User.init();
}

start();