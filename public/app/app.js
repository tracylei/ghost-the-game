'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	//$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('welcome', {
			url:'/welcome',
			templateUrl: 'partials/welcome',
		})
		.state('landing', {
			url:'/',
			templateUrl: 'partials/landing',
		})
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login',
			controller: 'LoginCtrl'
		})
		.state('new', {
			url: '/new',
			templateUrl: 'partials/new',
			controller: 'MainCtrl'
		})
		.state('index', {
			url:'/room/{roomId:[0-9]*}',
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

