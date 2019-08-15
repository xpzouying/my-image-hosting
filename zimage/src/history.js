const settings = require("electron-settings");
const { ipcMain } = require("electron");
// const moment = require("moment");

const historySettingsName = "upload-elements-history";

ipcMain.on("preview-history", event => {
  event.returnValue = uploadHistory;
});

class Element {
  constructor(url, thumbnail) {
    this.url = url;
    this.date = Date.now();
    this.thumbnail = thumbnail; // native-image
  }
}

// 上传记录列表
let uploadHistory = settings.get(historySettingsName) || [];

function saveUploadHistory(url, image) {
  let thumbnail = image.resize({
    quality: "good",
    height: 128
  });

  let b64 = thumbnail.toDataURL();
  let e = new Element(url, b64);

  if (uploadHistory.length >= 5) {
    uploadHistory.pop();
  }

  uploadHistory.unshift(e);
  settings.set(historySettingsName, uploadHistory);
}

module.exports = {
  saveUploadHistory: saveUploadHistory
};
