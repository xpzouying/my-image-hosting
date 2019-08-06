const { app } = require("electron");

const tray = require("./tray");

const openConfigWindow = () => {
  console.log("open config window");
};

function uploadCopiedImage() {
  console.log("upload copied image");
}

app.on("ready", function() {
  tray.createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
