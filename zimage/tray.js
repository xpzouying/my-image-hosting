const { app, Tray, Menu } = require("electron");
const path = require("path");

const conf = require("./config");

let tray;

function openConfigWindow() {
  if (conf.configWindow == null) {
    conf.createConfigWindow();
  }
}

function uploadCopiedImage() {
  console.log("upload copied image");
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
