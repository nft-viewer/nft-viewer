// Modules to control application life and create native browser window
const { dialog, app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
const isReachable = require('is-reachable');

let mainWindow;
let config;

function createWindow() {
	// Create the browser window.

	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "../preload.js")
		},
		width: 1280,
		height: 720,
		fullscreen: true,
		title: "NFT Viewer"
	});

	const args = process.argv[0] == "electron" || process.argv[0].endsWith("electron") ? process.argv.slice(2) : process.argv.slice(1);

	config = {desktop: true, address: args[0]};

	mainWindow.setMenu(null);

	(async () => {
		if (await isReachable("localhost:5173")) {
			mainWindow.loadURL(`http://localhost:5173/#${btoa(JSON.stringify(config))}`);
			return;
		}

		mainWindow.loadURL(`https://nft-viewer.github.io/#${btoa(JSON.stringify(config))}`);
	})();

	if (process.env.NODE_ENV == "development") {
		mainWindow.webContents.openDevTools();
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.

		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.