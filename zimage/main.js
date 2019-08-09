const { app } = require("electron");

const tray = require("./src/tray");

app.on("ready", function() {
  tray.createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
