// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example' | 'favorite-list' | 'favorite-add' | 'favorite-delete';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: any) {
      ipcRenderer.send(channel, args);
    },
    // on(channel: Channels, func: (...args: unknown[]) => void) {
    //   const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
    //     func(...args);
    //   ipcRenderer.on(channel, subscription);

    //   return () => {
    //     ipcRenderer.removeListener(channel, subscription);
    //   };
    // },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      console.log("once start");
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    send(channel: Channels) {
      ipcRenderer.send(channel)
    }

    // invoke(channel: Channels) {
    //   return ipcRenderer.on(channel, data);
    // },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
