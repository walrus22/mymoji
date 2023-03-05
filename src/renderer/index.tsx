import { createRoot } from 'react-dom/client';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ProSidebarProvider>
    <App />
  </ProSidebarProvider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
