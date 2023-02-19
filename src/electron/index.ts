import { IElectronAPI } from '../global';

class ElectronAPI implements IElectronAPI {
  openFile() {
    window.electronAPI.openFile();
  }

  setTitle(title: string) {
    window.electronAPI.setTitle(title);
  }

  doAThing() {
    return window.electronAPI.doAThing();
  }
}

export const electronAPI = new ElectronAPI();
