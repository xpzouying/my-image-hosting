const { BrowserWindow } = require("electron");
const path = require("path");

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

  configWindow.loadFile("config.html");

  configWindow.on("closed", () => {
    configWindow = null;
  });
}

module.exports = {
  createConfigWindow: createConfigWindow
};
