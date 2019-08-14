const settings = require("electron-settings");
const { ipcMain } = require("electron");

ipcMain.on("preview-history", event => {
  event.returnValue = uploadHistory;
  console.log("main send ipc history: ", uploadHistory);
});

// class Element {
//   constructor(url) {
//     this.url = url;

//     // TODO(zouying): use momentjs.com
//     this.date = now();
//   }
// }

// 上传记录列表
let uploadHistory = settings.get("upload-history") || [];

function saveUploadHistory(url) {
  if (uploadHistory.length >= 5) {
    uploadHistory.shift();
  }

  uploadHistory.push(url);

  console.log("save url: ", url, " succ, list: ", uploadHistory);
}

module.exports = {
  getUploadHistory: () => {
    return uploadHistory;
  },
  saveUploadHistory: url => {
    saveUploadHistory(url);
  }
};
