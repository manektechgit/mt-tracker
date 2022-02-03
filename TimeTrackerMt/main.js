const { app, BrowserWindow, screen, ipcMain, Tray, Menu, powerMonitor } = require("electron");
const screenshot = require("screenshot-desktop");
const path = require("path");
const { truncate } = require("fs");
const gotTheLock = app.requestSingleInstanceLock();
var fs = require('fs');
const { Buffer } = require("buffer");
const {
  hasScreenCapturePermission,
  hasPromptedForPermission
} = require('mac-screen-capture-permissions');

let isQuiting;
let tray;
let mainWindow;

app.on("before-quit", function () {
  isQuiting = true;
});

function createWindow() {
  tray = new Tray(path.join(__dirname, "AppIcon/16.png"));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Open Tracker",
        click: function () {
          mainWindow.show();
        },
      },
      {
        label: "Quit Tracker",
        click: function () {
          isQuiting = true;
          app.quit();
        },
      },
    ])
  );
  tray.setToolTip("MTTracker is an time tracking app developed by Manektech.");
  tray.on("click", () => {
    mainWindow.show();
  });

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    x: size.width / 3,
    y: 0,
    width: 620,
    height: 530,
    center: true,
    //icon: __dirname + "AppIcon/512.png",
    fullscreenable: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.on("close", function (event) {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });

  mainWindow.removeMenu();
  mainWindow.loadURL("http://50.21.182.225/mttracker/login");
  //mainWindow.loadURL("http://localhost:4200/login");
  //mainWindow.webContents.openDevTools()

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.on("ready", createWindow);
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

//function to take screen shot of user window
ipcMain.on("getData", (event, path) => {
  screenshot.listDisplays().then((displays) => {
    screenshot({ screen: displays[displays.length - 1].id })
      .then((img) => {
        event.reply("getData", Buffer.from(img).toString('base64'));
      });
  })
});

ipcMain.on("checkPermisssion",(event,path)=>{
  console.log(hasScreenCapturePermission());
  if (process.platform === "darwin"){
    event.reply("checkPermisssion",hasScreenCapturePermission());
  }
});

ipcMain.on("checkIdle",(event,path)=>{
  console.log(powerMonitor.getSystemIdleTime());
    event.reply("checkIdle",powerMonitor.getSystemIdleTime());
    powerMonitor.res
});
// powerMonitor.on('resume', () => {
//   console.log('The system is resuming');
// });

