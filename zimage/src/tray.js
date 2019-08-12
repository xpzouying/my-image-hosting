const { app, Tray, Menu, clipboard, dialog } = require("electron");
const path = require("path");
const conf = require("./config/config");
const { putObject } = require("./cos");

let tray;

function openConfigWindow() {
  if (conf.configWindow == null) {
    conf.createConfigWindow();
  }
}

function uploadCopiedImage() {
  let image = clipboard.readImage("clipboard");
  let imageSize = image.getSize();

  if (imageSize.height === 0 || imageSize.width === 0) {
    dialog.showErrorBox("invalid image", "image is empty");
    return;
  }

  putObject(image.toJPEG(100));
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
  tray = new Tray(path.join(__dirname, "../assets/images", "favicon.png"));

  trayMenu = Menu.buildFromTemplate(newTrayMenuTemplate());
  tray.setContextMenu(trayMenu);
}

module.exports = {
  createTray: createTray
};
