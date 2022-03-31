const User = require("./classes/singletons/User");

window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = "oops";
        }

    }

    const programs = ["chrome", "node", "electron"];
    for (const dependency of programs) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});