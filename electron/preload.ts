import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('palorni', {
  isElectron: true,
  executePowerShell: (command: string, requireAdmin = false) =>
    ipcRenderer.invoke('powershell:execute', { command, requireAdmin }),
  createRestorePoint: (name: string) =>
    ipcRenderer.invoke('system:create-restore-point', { name }),
  getHardwareSpecs: () =>
    ipcRenderer.invoke('system:get-hardware'),
  isAdmin: () =>
    ipcRenderer.invoke('system:is-admin'),
  controlWindow: (action: 'minimize' | 'maximize' | 'close') =>
    ipcRenderer.invoke('window:control', action)
});
