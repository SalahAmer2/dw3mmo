// launcher/src/main.js
const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        // 🟢 Development: load Vite server
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        // 🔵 Production: load built files
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }

    // Check for updates after window is ready
    win.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

// App ready
app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Auto-update events
autoUpdater.on("update-available", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Update available",
        message: "A new version is available. Do you want to download it now?",
        buttons: ["Yes", "Later"]
    }).then(result => {
        if (result.response === 0) { // User clicked "Yes"
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Update ready",
        message: "Update downloaded. Do you want to restart now?",
        buttons: ["Yes", "Later"]
    }).then(result => {
        if (result.response === 0) { // User clicked "Yes"
            autoUpdater.quitAndInstall();
        }
    });
});

// Quit when all windows closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});