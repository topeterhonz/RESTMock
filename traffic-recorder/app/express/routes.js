'use_strict';
var express = require('express');
var router = express.Router();
var requestActions = require('../actions/RequestActions.js');

router.post('/new', function(req, res) {
	if (isValidBody(req.body)) {
		requestActions.addCall(req.body);
    res.send('OK');
  } else {
    res.status(400).send("incorrect body");
  }
});

function isValidBody(body) {
  return isDefined(body.request) && isDefined(body.response)
}

function isDefined(prop) {
  return prop !== undefined && prop !== null
}
module.exports = router;
