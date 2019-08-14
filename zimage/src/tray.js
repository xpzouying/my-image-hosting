const {
  app,
  Tray,
  Menu,
  clipboard,
  dialog,
  BrowserWindow,
  Notification
} = require("electron");
const path = require("path");
const { putObject } = require("./cos");
const { saveUploadHistory } = require("./history");

let tray = null;

function openPreview() {
  let preview = new BrowserWindow({
    title: "preview",
    show: true
  });

  preview.loadURL(`file://${__dirname}/preview/preview.html`);
  preview.on("closed", () => {
    preview = null;
  });

  return preview;
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

  const url = putObject(image.toJPEG(100));
  console.log("put object: ", url);

  clipboard.writeText(url);

  let notification = new Notification({
    title: "图片地址已经拷贝",
    body: url
  });
  notification.show();

  saveUploadHistory(url);
}

function createTray() {
  tray = new Tray(path.join(__dirname, "../assets/images", "favicon.png"));

  const trayMenuTemplate = [
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

  tray.on("right-click", () => {
    console.log("right-click");

    let preview = openPreview();
  });

  const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setContextMenu(trayMenu);
}

module.exports = {
  createTray: () => {
    if (tray === null) {
      createTray();
    }

    return tray;
  }
};
