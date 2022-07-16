const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld("desktopAPI", {
	openURL: (url) => {shell.openExternal(url);},
	getConfig: async () => {return await ipcRenderer.invoke("getConfig");}
});