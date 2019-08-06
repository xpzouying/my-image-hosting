const { app, Tray, Menu } = require("electron");
const path = require("path");

const configWindow = require("./config");

let tray;

function openConfigWindow() {
  configWindow.createConfigWindow();
}

function newTrayMenuTemplate() {
  return (trayMenuTemplate = [
    {
      label: "config...",
      click: function() {
        openConfigWindow();
      }
    },
    {
      label: "upload image in clipboard",
      click: function() {
        uploadCopiedImage();
      }
    },
    {
      label: "quit",
      click: function() {
        app.quit();
      }
    }
  ]);
}

function createTray() {
  tray = new Tray(path.join("favicon.png"));

  trayMenu = Menu.buildFromTemplate(newTrayMenuTemplate());
  tray.setContextMenu(trayMenu);
}

module.exports = {
  createTray: createTray
};
