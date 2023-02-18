import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const baseDistDir = join(process.cwd(), 'dist');

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
};

app.on('window-all-closed', () => {
  // 窗口全部关闭时，退出应用
  if (process.platform !== 'darwin') app.quit();
});

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
