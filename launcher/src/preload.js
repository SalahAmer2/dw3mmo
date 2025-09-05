// launcher/src/preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    // later we can add methods here
});
