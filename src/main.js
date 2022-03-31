const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

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
    // Randomizer.randomizeAllSkins();
}

// start();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            devTools: true,
            contextIsolation: false
        }
    });

    win.loadFile("src/index.html");
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});