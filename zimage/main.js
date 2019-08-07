const { app } = require("electron");
const settings = require("electron-settings");

const tray = require("./tray");

global.config = {
  cos: null
};

function loadLocalConfig() {
  globalConfig = settings.get("config");
  global.config = globalConfig;
}

app.on("ready", function() {
  loadLocalConfig();
  tray.createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
