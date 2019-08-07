const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const settings = require("electron-settings");

let configWindow;

// save config when click the button in settings window
ipcMain.on("save-config", (event, arg) => {
  global.config = arg;

  settings.set("config", global.config);
});

function createConfigWindow() {
  configWindow = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: false,
    fullscreen: false,
    minimizable: false,
    title: "config",
    webPreferences: {
      nodeIntegration: true
    }
  });

  configWindow.loadFile(path.join(__dirname, "config.html"));

  configWindow.on("closed", () => {
    configWindow = null;
  });
}

module.exports = {
  configWindow: configWindow,
  createConfigWindow: createConfigWindow
};
