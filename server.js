
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

// //Connect to database using connection string
// //localhost: hostname
// //mydatabase: db name => will be created if it doesn't already exist
// //Use mongod in terminal to open connection
// mongoose.connect('mongodb://localhost/mydatabase');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error...'));
// //Listen to "open" event once
// db.once('open', function callback(){
// 	console.log('mydatabase db opened');
// });

// //Message schema to test retrieval from db
// //messageSchema holds new schema, passing in object that describes the schema of this collection
// var messageSchema = mongoose.Schema({message: String});
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage; //Will hold data pulled out of db
// //Use findOne() to find a single document
// //no params given => first document in collection will be returned
// //.exec() allows a callback to be passed in
// Message.findOne().exec(function(err, messageDocFound){
// 	//messageDocFound is the document found
// 	mongoMessage = messageDocFound.message;
// });



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
});
