import { version } from '../package.json';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  doAThing: () => version,
  // 通过预加载脚本暴漏渲染进程触发主进程监听的事件
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
});
