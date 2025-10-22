// launcher/src/main.js
const { app, BrowserWindow, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // if (process.env.VITE_DEV_SERVER_URL) {
    //     // 🟢 Development: load Vite server
    //     mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // } else {
    //     // 🔵 Production: load built files
    //     mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    // }

    // if (process.env.VITE_DEV_SERVER_URL) {
    //     // 🟢 Development: load Vite server
    //     console.log("🟢 Loading from dev server:", process.env.VITE_DEV_SERVER_URL);
    //     mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // } else {
    //     // 🔵 Production: load built files
    //     const filePath = path.join(__dirname, "../dist/index.html");
    //     console.log("🔵 Loading from file:", filePath);
    //     mainWindow.loadFile(filePath);
    // }

    if (process.env.VITE_DEV_SERVER_URL) {
        console.log("🟢 Loading from dev server:", process.env.VITE_DEV_SERVER_URL);
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        // ✅ Use path relative to the app's resources after packaging
        const indexPath = path.join(app.getAppPath(), "dist", "index.html");
        console.log("🔵 Loading built file:", indexPath);
        mainWindow.loadFile(indexPath);
    }

    // Check for updates once window is ready
    mainWindow.once("ready-to-show", () => {
        if (app.isPackaged) {
            autoUpdater.autoDownload = false; // interactive flow
            autoUpdater.checkForUpdates();
        }
    });
}

// Configure autoUpdater to use GitHub releases
autoUpdater.setFeedURL({
    provider: "github",
    owner: "SalahAmer2",   // 👈 replace with your GitHub username/org
    repo: "dw3mmo",          // 👈 replace with your repo name
});

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
        title: "Update Available",
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
        title: "Update Ready",
        message: "Update downloaded. Do you want to restart now?",
        buttons: ["Yes", "Later"]
    }).then(result => {
        if (result.response === 0) { // User clicked "Yes"
            autoUpdater.quitAndInstall();
        }
    });
});

autoUpdater.on("error", (err) => {
    console.error("Update error:", err);
});

// Quit when all windows closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
