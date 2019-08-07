const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const settings = require("electron-settings");

let config = settings.get("config");

// config 窗体
let configWindow;

// save config when click the button in settings window
ipcMain.on("save-config", (event, arg) => {
  console.debug("save config: ", arg);
  config = arg;
  event.returnValue = null;

  settings.set("config", config);
});

ipcMain.on("init-config", event => {
  console.log("ipcMain init-config: ", config);

  event.returnValue = config;
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
