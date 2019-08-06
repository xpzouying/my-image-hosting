const { app } = require("electron");

const tray = require("./tray");

const openConfigWindow = () => {
  console.log("open config window");
};

function uploadCopiedImage() {
  console.log("upload copied image");
}

app.on("ready", function() {
  console.log("hello world");
  tray.createTray();
});
