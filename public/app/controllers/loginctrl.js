var app = angular.module('app');

app.controller('LoginCtrl', function($scope, $http, $location){
	console.log("loading login ctrl");
	$scope.login = function(){
		console.log("attempting to log in");
		$http.post('/login', {"username": $scope.username, "password": $scope.password}).then(function(){
			console.log("client side redirecting");
			$location.url('/');
		});
	};
});
