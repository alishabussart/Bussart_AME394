// Alisha Bussart - Assignment One, AME 395: Advanced Javascript Programming, Fall 2015
// Assignment Description: Write a simple web server with a single route /getFibonacci. This route should take in one argument n and return the first n Fibonacci numbers.

var http = require('http');
var url = require('url');
var querystring = require('querystring');

var callback = function(req,res) {

	var query = url.parse(req.url).query;
	var route = req.url.split("?")[0];
	var params = querystring.parse(query);

	console.log(req.url);
	console.log(route);
	console.log(params);

	if(route == "/getFibonacci") {

		var n = parseFloat(params.n);
		res.writeHead(200, {'Content-Type': 'text/plain'});
				
		var fibRecursion = function(n) {
			if(n == 2) {
				return[0,1];
			}
			else if(n == 1) {
				return[0];
			} 
			else {
				var x = fibRecursion(n-1);
				x[x.length] = x[x.length - 1] + x[x.length - 2];
				return x; // returns the list of numbers
			}
		}
		
		res.end("Fibonacci(" + n + ") = " + fibRecursion(n));
		
	}
	
	else {
		res.end('Unidentified Route');
	}

}

var server = http.createServer(callback);
server.listen(1337, "127.0.0.1"); // port is 1337
console.log('Server running at http://127.0.0.1:1337/');