
// ========================== Modules ==========================
var express 		= require('express');
var stylus 			= require('stylus');
var logger 			= require('morgan');
var bodyParser 		= require('body-parser');
var cookieParser    = require('cookie-parser');
var http			= require('http');
var passport 		= require('passport');
var session 		= require('express-session');
var RedisStore      = require('connect-redis')(session);
var passportSocketIo= require('passport.socketio');
// ========================== Routes ===========================
var authentication 	= require('./routes/authentication');
// =============================================================
var db 				= require('./database');


//Set default value to 'development' if process.env.NODE_ENV isn't set
var eng = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var server = http.Server(app);
var io = require('socket.io').listen(server);
var sessionStore = new RedisStore({host: 'localhost', port: 6379});


// ========================== Middleware ========================
//Compile function that gets used by the middleware
function compile(str, path){
	return stylus(str).set('filename', path);
}
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser());
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
app.use(session(
    {
        key: 'connect.sid',
        secret: 'securedsession',
        resave: false,
        saveUninitialized: true,
        store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,       // the same middleware you registrer in express
  key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
  secret:       'securedsession',    // the session_secret to parse the cookie
  store:        sessionStore//,        // we NEED to use a sessionstore. no memorystore please
  //success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
  //fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
}));

function isAuthenticated(req, res, next){
    console.log('req.isAuthenticated: ' + req.isAuthenticated());
    console.log('req.session: ' + JSON.stringify(req.session));
	if(!req.isAuthenticated()){
		res.redirect('/login');
	}else{
		next();
	}
};


// ================================================================


// ========================== Routing =============================
app.use('/', authentication);
app.use(express.static(__dirname + '/public'));
app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});
app.get('/', function(req, res){
    res.render('index');
});
app.get('/room/:roomNum', isAuthenticated, function(req, res){
	res.render('index');
});
app.get('*', isAuthenticated, function(req, res){
	res.render('index');
});
// ================================================================


var port = 3030;
server.listen(port, function(){
	console.log('Listening on port ' + port + '...');
});

var rooms = {}; //room - users
var users = {}; //user - room


io.on('connection', function(socket){
	console.log("connected");
	socket.join('lobby');

	socket.on('disconnect', function() {
		var id = socket.rooms[socket.id];
		//If user joined a room
		if(users[id] != null){
			//Delete the user from the user list of the associated room
			var ind = rooms[user[id]].indexOf(id);
			rooms[user[id]].splice(ind, 1);
			socket.leave(user[id]);
		}
	    io.emit('user disconnected');
	    console.log('disconnected');
	});
	socket.on('key press', function(key) {
		console.log("detected key press on server side");
		console.log("Key pressed: " + String.fromCharCode(key));
		var letter = String.fromCharCode(key);
		console.log(socket.rooms[socket.id]);
		socket.broadcast.to(socket.rooms[socket.id]).emit('key received', letter);
	});
	socket.on('join room', function(room){
		console.log("joining room " + room + " server");
        console.log("socket.request.user: " + JSON.stringify(socket.request.user));
		if(rooms[room] == null){ //room is empty
			rooms[room] = [socket.request.user.username];
        }
		else {//room is not empty
            rooms[room].push(socket.request.user.username);
        }
		if(users[socket.request.user.username]){
            console.log(users[socket.request.user.username]);
            users[socket.request.user.username].push(room);
        }
        else{
            users[socket.request.user.username] = [room];
        }

		socket.join(room); //join() is asynchronous!

        console.log("users:" + JSON.stringify(users));
        console.log("rooms:" + JSON.stringify(rooms));
		//Notify client side so url is changed
		io.sockets.connected[socket.id].emit("joined room", room);
	})
});
