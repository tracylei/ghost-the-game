var app = angular.module('app');

app.service('UserService', function($http){
	this.login = function(username, password){
		return $http.post('/login', {"username": username, "password": password}).then(function(response){
			return response.data;
		});
	};

	this.signup = function(username, password){
		return $http.post('/signup', {"username": username, "password": password}).then(function(response){
			return response.data;
		});
	};    
});