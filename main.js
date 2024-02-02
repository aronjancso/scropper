const { app, BrowserWindow } = require('electron');
const screenshot = require('screenshot-desktop');

screenshot.listDisplays().then((displays) => {
  for (let index = 0; index < displays.length; index++) {
    const display = displays[index];
    const imgpath = path.join(__dirname, Date.now() + '_' + index + '.png')

    screenshot({
      screen: display.id,
      format: 'png',
      filename: imgpath,
    }).then(() => {
        console.log('Success');
    }).catch((err) => {
      console.warn(err);
    });
  }
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadFile('dist/index.html');
  //mainWindow.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }

  app.quit(); // Only for development purposes
});
