const { app, BrowserWindow } = require('electron')
const screenshot = require('screenshot-desktop')

screenshot
  .listDisplays()
  .then((displays) => {
    console.log(displays)
    console.log(process.platform)
  })

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('dist/index.html')
  //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Disabled for debuggng purposes
    //app.quit()
  }
})
