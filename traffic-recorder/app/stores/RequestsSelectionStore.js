'use strict';
var actions = require('../actions/RequestSelectionActions.js');
var Reflux = require('reflux');
var RequestsSelectionStore = Reflux.createStore({
    listenables: actions,
    selectedRequests: [],

    getSelections: function() {
        this.trigger(this.selectedRequests);
    },

    changeSelections: function(newSelectedRequests) {
      this.selectedRequests = newSelectedRequests;
      this.getSelections();
    }
});

module.exports = RequestsSelectionStore;
