const {
  app,
  Tray,
  Menu,
  clipboard,
  dialog,
  BrowserWindow
} = require("electron");
const path = require("path");
const conf = require("./config/config");
const { putObject } = require("./cos");

let tray;

function openConfigWindow() {
  if (conf.configWindow == null) {
    conf.createConfigWindow();
  }
}

function openSettingsWindow() {
  let win = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: true,
    fullscreen: false,
    minimizable: false,
    title: "settings",
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  });

  win.loadURL(`file://${__dirname}/settings/settings.html`);

  win.on("closed", () => {
    win = null;
  });

  win.on("ready-to-show", () => {
    win.show();
  });
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
      label: "settings...",
      click: function() {
        openSettingsWindow();
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
