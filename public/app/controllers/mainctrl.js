var app = angular.module('app');

app.controller('MainCtrl', function($scope){
	console.log("mainctrl");
	var socket = io.connect("http://localhost:3030");	
	socket.on('connect', function(data){
		console.log("connected from mainctrl");
	});

	//Key press
	$scope.press = function($event){
		console.log("detected key press on client side");
		socket.emit('key press', $event.keyCode);
	};
});