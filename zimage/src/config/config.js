import { BrowserWindow, ipcMain } from "electron";
const settings = require("electron-settings");

let config = settings.get("config");

let configWindow;

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

// const createConfigWindow = async () => {
function createConfigWindow() {
  configWindow = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: false,
    fullscreen: false,
    minimizable: false,
    title: "settings",
    webPreferences: {
      nodeIntegration: true
    }
  });

  configWindow.loadURL(`file://${__dirname}/config.html`);

  configWindow.on("closed", () => {
    configWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);

// // Quit when all windows are closed.
// app.on("window-all-closed", () => {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (configWindow === null) {
//     createWindow();
//   }
// });

module.exports = {
  config: config,
  configWindow: configWindow,
  createConfigWindow: createConfigWindow
};
