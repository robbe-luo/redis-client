import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron';
import { join } from 'path';

const baseDistDir = join(process.cwd(), 'dist');

function handleSetTitle(event: IpcMainEvent, title: string) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win?.setTitle(title);
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});

  if (!canceled) {
    return filePaths[0];
  }
}

const createWindow = () => {
  // 创建 window
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: join(baseDistDir, 'main', 'preload.js'),
    },
  });

  // 加载文件
  win.loadFile(join(baseDistDir, 'client', 'index.html'));
  win.webContents.openDevTools();
};

app.on('window-all-closed', () => {
  // 窗口全部关闭时，退出应用
  if (process.platform !== 'darwin') app.quit();
});

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(() => {
  // 为
  ipcMain.handle('dialog:openFile', handleFileOpen);
  // 增加 ipc 通道，监听渲染进程添加到主进程的事件
  ipcMain.on('set-title', handleSetTitle);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
