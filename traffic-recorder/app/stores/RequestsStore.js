'use strict';
var actions = require('../actions/RequestActions.js');
var Reflux = require('reflux');
var RequestsStore = Reflux.createStore({
    listenables: actions,
    calls: [],

    getRequests: function() {
        this.trigger(this.calls);
    },

    addCall: function(call) {
      call.request.id = this.calls.length
      this.calls.push(call);
      this.getRequests();
    }
});

module.exports = RequestsStore;
