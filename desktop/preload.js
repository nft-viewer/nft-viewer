const { contextBridge, shell } = require('electron');

contextBridge.exposeInMainWorld("desktopAPI", {
	openURL: (url) => {shell.openExternal(url);}
});