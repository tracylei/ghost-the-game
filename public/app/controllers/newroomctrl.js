var app = angular.module('app');

app.controller('NewRoomCtrl', function($scope, $http, $location, UserService){
	$scope.roomNum;
	$scope.joinRoom = function(){
		console.log("join");
	};
	$scope.createRoom = function(){
		console.log("create");
	};
});
