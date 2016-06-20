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
		.state('index.first', {
			url: '^/first',
			templateUrl: 'partials/first',
		})
		.state('index.second', {
			url: '^/second',
			templateUrl: 'partials/second'
		});

});

app.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(true);
}]);

app.controller('MainCtrl', function($scope){
	console.log("mainctrl");
	var socket = io.connect("http://localhost:3030");
	// socket.on('connect', function(data){
	// 	console.log("connected from mainctrl");
	// });
});
