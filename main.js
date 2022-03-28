// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const electron = require('electron')
const path = require('path')
const globalShortcut = electron.globalShortcut

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 256,
    height: 512,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  globalShortcut.register('f5', function() {
		mainWindow.reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		mainWindow.reload()
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
