import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

const IS_DEV = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 980,
    height: 650,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: false, // 不集成 Nodejs
      webSecurity: false,
      enableRemoteModule: true,
      preload: IS_DEV
        ? path.join(__dirname, "./nodejs/index.js")
        : path.join(__dirname, "./nodejs/index.prod.js"), // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    },
  });

  if (IS_DEV) {
    mainWindow.webContents.openDevTools({ mode: "right" });
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "build", "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
