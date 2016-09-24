var express 		= require('express');
var http			= require('http');

var app = express();
var server = http.Server(app);

var rooms = {}; //room - users
var users = {}; //user - room

var io = require('socket.io').listen(server);

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
		if(rooms[room] == null) //room is empty
			rooms[room] = [socket.rooms[socket.id]];
		else //room is not empty
			rooms[room].push(socket.rooms[socket.id]);
		users[socket.rooms[socket.id]] = room;
		console.log(rooms);
		socket.join(room); //join() is asynchronous!

		//Notify client side so url is changed
		io.sockets.connected[socket.id].emit("joined room", room);
	})
});
