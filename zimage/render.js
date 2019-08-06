const { ipcRenderer } = require("electron");

// ipcRenderer.send("asynchronous-message", "haha");
ipcRenderer.sendSync("synchronous-message", "haha");
