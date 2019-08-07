const { ipcRenderer } = require("electron");

let config = ipcRenderer.sendSync("init-config");

let saveButton = document.getElementById("savebutton");
let regionInput = document.getElementById("input-region");
let bucketInput = document.getElementById("input-bucket");
let secretIDInput = document.getElementById("input-secretid");
let secretKeyInput = document.getElementById("input-secretkey");

saveButton.addEventListener("click", () => {
  config.cos = {
    region: regionInput.value,
    bucket: bucketInput.value,
    secretid: secretIDInput.value,
    secretkey: secretKeyInput.value
  };

  ipcRenderer.send("save-config", config);
});

// set input value
window.addEventListener("load", () => {
  if (config === null) {
    config = {
      cos: null
    };

    return;
  }

  regionInput.value = config.cos.region;
  bucketInput.value = config.cos.bucket;
  secretIDInput.value = config.cos.secretid;
  secretKeyInput.value = config.cos.secretkey;
});
