'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('index', {
			url: '/',
			views: {
				'':{
					templateUrl: 'partials/home',
					controller: 'MainCtrl'
				},
				'header@': {
					templateUrl: 'partials/header'
				},
				'footer@': {
					templateUrl: 'partials/footer'
				}
			}
		})
		.state('index.game', {
			url: '^/game',
			templateUrl: 'partials/game',
		})
		.state('index.help', {
			url: '^/help',
			templateUrl: 'partials/help'
		});

});

app.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(true);
}]);

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
