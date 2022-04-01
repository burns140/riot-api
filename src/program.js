const { GUN_NAMES } = require("./common/Constants");

const ipcRenderer = require("electron").ipcRenderer;

const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", e => {
    ipcRenderer.send("getCookies", {
        username: username.value,
        password: password.value
    });
});

ipcRenderer.on("finEntitle", (e, message) => {

})