var myConfig = angular.module('myConfig',['ngRoute']);

myConfig.config(['$routeProvider',function($routeProvider){
	$routeProvider
	
    .when('/',{
		templateUrl:'partials/login.html',
		controller:'LoginCtrl'
	})	
	
    .when('/Intro.html',{
		templateUrl:'partials/Intro.html',
		controller:'IntroCtrl'
	})	
    
    .when('/UnauthorizedAccess.html',{
		templateUrl:'partials/UnauthorizedAccess.html',
        controller:'UnauthorizedAccessCtrl'
	})	
	
	
	.when('/Quiz.html',{
		templateUrl:'partials/Quiz.html',
		controller:'QuizCtrl'
	})
	.when('/results.html',{
		templateUrl:'partials/results.html',
		controller:'ResultsCtrl'
	})	
	
	
	
}])

