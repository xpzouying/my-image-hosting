const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const settings = require("electron-settings");

ipcMain.on("save-config", (event, arg) => {
  global.config = arg;

  console.debug("config will save: ", global.config);

  settings.set("config", global.config);
});

let configWindow;

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
