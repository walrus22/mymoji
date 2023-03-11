/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { PythonShell } from 'python-shell';
import { emojiElementTest, emojiMainSmallTest} from '../testData';




class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const RESOURCES_PATH = app.isPackaged
? path.join(process.resourcesPath, 'assets')
: path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

// const scriptPath = getAssetPath(path.join('python_modules', 'mymoji_test.py'));
const scriptPath = getAssetPath(path.join('python_modules', 'tracker.py'));
const pyPath = getAssetPath(path.join('python_modules', 'venv', 'Scripts', 'python.exe'));
const pyshell = new PythonShell(scriptPath, { pythonPath: pyPath })

let userFavoriteEmojis:FavoriteEmojis = emojiMainSmallTest
let userFavoriteElements = emojiElementTest

/////////////////// IPC ////////////////////////////////////
ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});


// Home 화면에서 favorite 제공
ipcMain.on('favorite-list', (event) => {
  // event.sender.send('favorite-list', userFavoriteElements);
  event.sender.send('favorite-list', [userFavoriteEmojis, userFavoriteElements]);
});

// home 이나 search에서 favorite 추가
ipcMain.on('favorite-add', (event, obj:EmojiElement) => {
  userFavoriteElements.push(obj)
  console.log(userFavoriteElements);
  // pyshell.send(JSON.stringify(userFavoriteElements));
});

// favorite deletion
ipcMain.on('favorite-delete', (event, obj : EmojiElement) => {
  userFavoriteElements = userFavoriteElements.filter((item) => !(item.id === obj.id && item.emoji_id === obj.emoji_id))
  console.log(userFavoriteElements);
  pyshell.send(JSON.stringify(userFavoriteElements));
});

// window.electron.ipcRenderer.sendMessage('favorite-delete', ret);

////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  pyshell.on('message', function (message) {
    console.log('Received message from Python script:', message);
  });
  // 작동하는건가이게
  pyshell.on('error', function (error) {
    console.error('Error while running Python script:', error);
  });

  mainWindow = new BrowserWindow({
    show: false,
    width: 1400,
    height: 900,
    minWidth: 525,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      webSecurity: false, // for developing CORS
    },
  });

  mainWindow.setPosition(2560,1000)
  mainWindow.loadURL(resolveHtmlPath('index.html'))

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};


/**
 * Add event listeners...
 */


app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
