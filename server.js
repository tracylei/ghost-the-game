
// ========================== Modules ==========================
var express 	= require('express');
	stylus 		= require('stylus');
	logger 		= require('morgan');
	bodyParser 	= require('body-parser');
	mongoose 	= require('mongoose');
	http		= require('http');
// =============================================================


//Set default value to 'development' if process.env.NODE_ENV isn't set
var eng = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var server = http.Server(app);


// ========================== Middleware ========================
//Compile function that gets used by the middleware
function compile(str, path){
	return stylus(str).set('filename', path);
}
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(stylus.middleware(

	
	{
		src:__dirname + '/public',
		compile: compile //Config object's compile function
	}
));
// ===============================================================


// ========================== Routing ========================
app.use(express.static(__dirname + '/public'));
app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});
app.get('*', function(req, res){
	res.render('index');
});
// ===========================================================


var port = 3030;
server.listen(port, function(){
	console.log('Listening on port ' + port + '...');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
	console.log("connected");
	socket.on('disconnect', function() {
	    io.emit('user disconnected');
	    console.log('disconnected');
	});
	socket.on('key press', function(key) {
		console.log("detected key press on server side");
		console.log("Key pressed: " + String.fromCharCode(key));
		var letter = String.fromCharCode(key);
	});
});
