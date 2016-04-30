"use_strict";
var url = require('url');
function formatCalls(calls) {
	var result = "";
  calls = calls.sort(function(a,b) {
    return a.request.id-b.request.id;
  });

	for (var i = 0; i < calls.length; i++) {
    var req = calls[i].request;
		result += "RESTMockServer.when"+req.method.toUpperCase()+"(pathContains(\""+url.parse(req.url).pathname + "\").thenReturnFile(\"mocks/some/file.json\");\n";
	}
	return result;
};

module.exports.formatCalls = formatCalls;
