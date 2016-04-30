'use strict';
var express = require('express');
var routes = require('./Routes.js');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use('/',routes);

exports.start = function() {
  app.listen(3000, function () {
  });
}

exports.stop = function() {
  app.close();
}
