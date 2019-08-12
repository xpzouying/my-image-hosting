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
  const image = clipboard.readImage("clipboard");
  const imageSize = image.getSize();

  if (imageSize.height === 0 || imageSize.width === 0) {
    dialog.showErrorBox("invalid image", "image is empty");
    return;
  }

  putObject(image.toJPEG(100));
}

function createTray() {
  tray = new Tray(path.join(__dirname, "../assets/images", "favicon.png"));

  const trayMenuTemplate = [
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
  ];
  const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setContextMenu(trayMenu);
}

module.exports = {
  createTray: createTray
};
