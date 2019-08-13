const { ipcMain } = require("electron");
const settings = require("electron-settings");

const defaultCosConfig = {
  bucket: "",
  region: "",
  secretid: "",
  secretkey: ""
};

const defaultConfig = {
  cos: defaultCosConfig
};

let config = settings.get("config") || defaultConfig; // load all config from local fs

ipcMain.on("save-config-v2", (event, cfg) => {
  console.log("main receive config: ", cfg);

  config = cfg;
  event.returnValue = null;

  settings.set("config", config);
});

ipcMain.on("init-config-v2", event => {
  console.log("ipcMain send init-config: ", config);

  event.returnValue = config;
});

module.exports = {
  getConfig: () => {
    return config;
  }
};
