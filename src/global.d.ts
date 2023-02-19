export interface IElectronAPI {
  doAThing: () => string;
  setTitle: (string) => void;
  openFile: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
