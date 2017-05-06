var myApp = angular.module('myApp',[]);

myApp.factory('myservice',['$http',function($http){
	
	var bookDetails = null;
	var availableBooks =[];
	var officialAnswers=[];
	
	var BookData ={};
	BookData.getData = function(cb)
		{
			$http.get('data/questions.json').success(function(data)
					{
						cb(data.questions);
					});
		};
		
			
		return BookData;
	
		
}]);

myApp.factory('sessionTracker',[function(){
        
        var userId=null;
                
        return{
            trackUser : function(username)
            {                
                userId=username;
               
            },
            
               
            getUserId: function () 
            {
                return userId;
            }
            
        }
        
        
         
                   
        
        
    
    
}])

myApp.factory('loginService',['$http',function($http){
    
    var LoginData={};
    LoginData.getData = function(cb)
        {
            $http.get('data/roles.json').success(function(data)
					{
						cb(data.users);
					});
        };
    
    return LoginData;
    
}]);
