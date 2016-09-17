'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login',
			controller: 'LoginCtrl'
		})
		.state('new', {
			url: '/new',
			templateUrl: 'partials/new',
			controller: 'NewRoomCtrl'
		})
		.state('home', {
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

