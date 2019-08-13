const { ipcMain } = require("electron");
const settings = require("electron-settings");

let config = settings.get("config"); // load all config from local fs

if (config.cos === null) {
  config.cos = {
    bucket: "",
    region: "",
    secretid: "",
    secretkey: ""
  };
}

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

// export default () => {
//   config: config;
// };

module.exports = {
  config: config
};
