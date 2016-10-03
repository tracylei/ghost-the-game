var app = angular.module('app');

app.controller('MainCtrl', function($scope, $window, $http, $location){
	console.log("mainctrl");

	var socket = io.connect("http://localhost:3030");	
	socket.on('connect', function(data){
		console.log("connected from mainctrl");

        var location = $location.path();

        if(location.search('room') > 0){
            console.log(location);
            var room = location.replace('/room/', '')
            socket.emit('join room', room);
        }
	});

	//Key press
	$scope.press = function($event){
		console.log("detected key press on client side");
		socket.emit('join room', 'lobby');
		socket.emit('key press', $event.keyCode);
	};

	socket.on('key received', function($letter){
		console.log($letter);
		console.log("key received");
	});

	var isValidURL = function(url){
		// var pattern = /[^0-9]/;
		// console.log(url.search(pattern));
		// if(url.search(pattern) == -1)
		 	return true;
		// return false;
	};

	$scope.roomId;
	$scope.joinRoom = function(){
		console.log("join room client");
		if(isValidURL($scope.roomId)){
			socket.emit('join room', $scope.roomId);
		}
		else
			console.log("Please enter a valid room number");
	};

	socket.on('joined room', function(room){
		console.log("attempting to change url");
        if($location.url() != '/room/' + room){
            $location.assign('/room/' + room);
        }
	});
});