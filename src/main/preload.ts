// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
// import dotenv from 'dotenv';
// dotenv.config();

export type Channels = 'ipc-example' | 'favorite-list' | 'favorite-add' | 'favorite-delete';

const electronHandler = {
  ipcRenderer: {
    home(channel: Channels, func: (args: [FavoriteEmojis,FavoriteElements]) => void) {
      const subscription = (_event: IpcRendererEvent, args: [FavoriteEmojis,FavoriteElements]) => func(args);
      ipcRenderer.on(channel, subscription);
      return () => {
        // console.trace("removed completely");
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        console.log("removed completely");
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    sendMessage(channel: Channels, args: any) {
      ipcRenderer.send(channel, args);

      return () => {
        console.log("removed completely");
        ipcRenderer.removeListener(channel, args);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
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


const envVars = {
  // API_URL: process.env.API_URL
  // API_URL: "http://mymoji.iptime.org:20000",
  API_URL: "http://127.0.0.1:20000/",
}


contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('envVars', envVars);

export type ElectronHandler = typeof electronHandler;
export type EnvVars = typeof envVars;
