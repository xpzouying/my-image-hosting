const { BrowserWindow, ipcMain } = require("electron");
const settings = require("electron-settings");
const path = require("path");

ipcMain.on("synchronous-message", (event, arg) => {
  console.log("get haha: ", arg);
});

let configWindow;

function createConfigWindow() {
  configWindow = new BrowserWindow({
    width: 480,
    height: 360,
    resizable: false,
    fullscreen: false,
    minimizable: false,
    title: "config"
  });

  configWindow.loadFile(path.join(__dirname, "config-window.html"));

  configWindow.on("closed", () => {
    configWindow = null;
  });
}

module.exports = {
  configWindow: configWindow,
  createConfigWindow: createConfigWindow
};
