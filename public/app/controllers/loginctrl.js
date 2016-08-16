var app = angular.module('app');

app.controller('LoginCtrl', function($scope, $http, $location, UserService){
	console.log("loading login ctrl");
	$scope.login = function(){
		console.log("attempting to log in");
		UserService.login($scope.username, $scope.password).then(function success(data){
			console.log("Auth success");
			$location.url('/');
		}, function error(data){
			console.log("Auth failed");
		});
	};

	$scope.signup = function(){
		
	}
});
