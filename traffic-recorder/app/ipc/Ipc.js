'use-strict'
const requestsStore = require('../stores/RequestsStore.js');
const requestsSelectionStore = require('../stores/RequestsSelectionStore.js');
const ipcMain = require('electron').ipcMain;
var requestActions = require('../actions/RequestActions.js');
var requestSelectionActions = require('../actions/RequestSelectionActions.js');

function mainWindowReady(mainWindow) {

	requestsStore.listen(function(requests) {
		mainWindow.webContents.send('requests-list', requests);
	});

	requestsSelectionStore.listen(function(selectedRequests) {
		mainWindow.webContents.send('selected-calls-list', selectedRequests);
	});

	ipcMain.on('get-requests-list', function(event, arg) {
		requestActions.getRequests();
	});

	ipcMain.on('requests-selection-change', function(event, arg) {
		requestSelectionActions.changeSelections(arg);
	});

	ipcMain.on('get-selected-calls-list', function(event, arg) {
		requestSelectionActions.getSelections();
	});
}

module.exports.mainWindowReady = mainWindowReady;
