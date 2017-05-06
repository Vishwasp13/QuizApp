var controller = angular.module('controllers',[]);

controller.controller('LoginCtrl', ['$scope','sessionTracker','$http','$location','loginService',function($scope,sessionTracker,$http,$location,loginService){
    
    var username=null;
	var password=null;
	var role=null;
	var inputPassword =null;
	var roleOfPassedUsername=null;	
	var variable=null;
	var userDetails=[];
        
    	loginService.getData(function(r)
			{
				variable = r;
            })
	
	   $scope.validate = function(user)
       { 
		
		var boolean=null;
		angular.forEach(variable, function(value,index){
			
			
			username = value.username;
						
			var inputUsername = user.username;
			
			password = value.password;
			inputPassword = user.password;
			
			
			if(username==inputUsername && password==inputPassword ){
				roleOfPassedUsername = value.role;
				userDetails.push(value);
				boolean =true;
								
			}
						
			
			
		});
		
		if(boolean==true)
		{
				sessionTracker.trackUser("user");
                
				if(roleOfPassedUsername=="admin")
				{
					$location.path("Admin.html");
				}
				else if (roleOfPassedUsername=="user")
                {
				    $location.path("Intro.html");
				}
                                       	
		}
		
		else
        {
			alert("Invalid Username/Password!");
		}
		
	
	}


    
    
}]);



controller.controller('IntroCtrl',['$rootScope','sessionTracker','$scope','$http','$location', function($rootScope,sessionTracker,$scope,$http,$location){
		
        var userId=null;
        userId=sessionTracker.getUserId();
    
        if(userId!=null){
            
            $scope.begin = function(){
            $location.path('Quiz.html');
            }
             
        }
        else{
            $location.path('UnauthorizedAccess.html');
        }
        
        
	

}]);



controller.controller("QuizCtrl",['$scope','$rootScope','$http','myservice','$location','$timeout','sessionTracker', function($scope,$rootScope,$http,myservice,$location,$timeout,sessionTracker){
    
        var userId=null;
        userId=sessionTracker.getUserId();
    
        if(userId!=null){
            
            $scope.seconds=0;
			$scope.hour=0;
			$scope.minute=2;
			var counter=0;
			var inputData=null;
			var variable = null;
			var options = [];
			var questions=[];
			var ids=[];
			var officialAnswers=[];
			var subjectsAnswers=[];
			var i=0;
			var score=0;
			$scope.indication =true;
			var firstQuestion=null;
			$scope.isAnswered=[];
			
			
			//To start countdown when the time duration is only in minutes
			
			$scope.countdownInMinutes = function(){
				$scope.minutesTerminator = $timeout(function()
					{	
										
						if($scope.minute>0)
				     	{
				     		if($scope.seconds>0)
				     			{
				     				$scope.seconds--;
				     				
				     				//For displaying in 00 format when it falls less than 10 e.g 01 02
		     						if($scope.seconds<10)
	     							{
	     								$scope.seconds = "0"+$scope.seconds;
	     							}
				     				
				     			}
				     		if($scope.seconds==0)
					     			{
					     				if($scope.minute>0)
					     					{
					     						$scope.seconds=60;
					     						$scope.minute--;
					     						
					     						//For displaying in 00 format when it falls less than 10 e.g 01 02
					     						if($scope.minute<10)
				     							{
				     								$scope.minute = "0"+$scope.minute;
				     							}
					     						
					     					}
					     			}
				     	}
						
						if($scope.minute==0)
							{
								if($scope.seconds>0)
				     			{
				     				$scope.seconds--;
				     				
				     				//For displaying in 00 format when it falls less than 10 e.g 01 02
		     						if($scope.seconds<10)
	     							{
	     								$scope.seconds = "0"+$scope.seconds;
	     							}
				     				
				     			}
							}
				    
						$scope.time = parseInt($scope.minute+""+$scope.seconds);
						$scope.countdownInMinutes();   
				    }, 1000);
				
				if($scope.seconds==0 && $scope.minute==0)
					{
						$scope.submit();
					}
			}
			
			//To start the countdown when the timer is in hours
			$scope.countdownInHours = function(){
					
					$scope.hoursTerminator = $timeout(function()
							{
						
						if($scope.hour>0)
							{
																
								//Logic for minutes
								if($scope.minute>0 | $scope.minute<=60)
								{
									if($scope.seconds>0)
					     			{
										$scope.seconds--;
										
										//For displaying in 00 format when it falls less than 10 e.g 01 02
			     						if($scope.seconds<10)
		     							{
		     								$scope.seconds = "0"+$scope.seconds;
		     							}
										
					     				
					     			}
									if($scope.seconds==0)
						     			{
						     				if($scope.minute>0)
						     					{
						     						$scope.seconds=60; //auto fill seconds default is 60 test 10
						     						$scope.minute--;
						     						
						     						//For displaying in 00 format when it falls less than 10 e.g 01 02
						     						if($scope.minute<10)
					     							{
					     								$scope.minute = "0"+$scope.minute;
					     							}
						     					}
						     			}
								}
								
								if($scope.minute==0)
									{
										$scope.hour--;
										
										//For displaying in 00 format when it falls less than 10 e.g 01 02
										if($scope.hour<10)
		     							{
		     								$scope.hour = "0"+$scope.hour;
		     							}
										$scope.minute=60; //Autofill minutes default is 60 test 2
									}
							}
						
						if($scope.hour==0)
							{
								if($scope.minute>0 | $scope.minute<=60)
								{
									if($scope.seconds>0)
					     			{
					     				$scope.seconds--;
					     				
					     				//For displaying in 00 format when it falls less than 10 e.g 01 02
					     				if($scope.second<10)
		     							{
		     								$scope.second = "0"+$scope.second;
		     							}
					     				
					     			}
									if($scope.seconds==0)
						     			{
						     				if($scope.minute>0)
						     					{
						     						$scope.seconds=60; //autofill seconds 60 test 10
						     						$scope.minute--;
						     						
						     						//For displaying in 00 format when it falls less than 10 e.g 01 02
						     						if($scope.minute<10)
						     							{
						     								$scope.minute = "0"+$scope.minute;
						     							}
						     						
						     					}
						     			}
								}
								if($scope.minute==0){
									$scope.second--;
									
									//For displaying in 00 format when it falls less than 10 e.g 01 02
									if($scope.second<10)
	     							{
	     								$scope.second = "0"+$scope.second;
	     							}
	     						
								}
								
							}
						
						$scope.time = parseInt($scope.hour+""+$scope.minute+""+$scope.seconds);
						
						$scope.countdownInHours();
						
						
					},1000);
					
					
					if($scope.hour==0 && $scope.seconds==0 && $scope.minute==0)
					{
						
						$scope.submit();
					}
					
			}
			
			//When the time is only in minutes I'll be working
			if($scope.hour==0){
				$scope.hour=0+""+0;
				$scope.countdownInMinutes();
				
			}
			
			//When the time is in hours I'll work.
			if($scope.hour>0)
			{
				//$scope.hoursTerminator = $timeout(countdownInHours,0);
				$scope.countdownInHours();
				if($scope.hour<10)
					{
						$scope.hour = "0"+$scope.hour;
					}
			
			}
			
			myservice.getData(function(r)
			{
				
                i=r.length-1;
                $rootScope.maximumMarks=r.length;
				$rootScope.variable=r;
				inputData = $rootScope.variable
                
                //Separating questions, their respective options and ids.
				angular.forEach(inputData, function(value,index){
					options.push(value.options.option);
					questions.push(value.question);   //replace questions with options and log options of [0]
					officialAnswers.push(value.answer);
					ids.push(value.id);
				})
                
				$scope.ids=ids;
				$rootScope.firstQuestion = questions[0];
				$rootScope.optionsForFirstQuestion = options[0];
				$scope.id = ids[0];
				$scope.isFirstQuestion=true;
			
			
																		
			});
			
	    
			$scope.$watch('option', function(newVal, oldVal){
			  			    
				subjectsAnswers[counter]=newVal;
				
				if(newVal!=undefined){
					$scope.isAnswered[counter]= "answered";
				}
				
								
			  });
			
			
			$rootScope.nextQuestion = function(answer)
			{
				
				$scope.isFirstQuestion=false;
				if(counter<i)
				{
					counter=counter+1;
					$rootScope.firstQuestion = questions[counter];
					$rootScope.optionsForFirstQuestion = options[counter];
					$scope.id = ids[counter];
					$scope.display=undefined;
                    $scope.answeredAnswer=subjectsAnswers[counter];
					if(counter==i)
						{
							$scope.variable=false;
							$scope.isLastQuestion =true;
						}
				}
				
			}
			
			
			
			
			
			$rootScope.previousQuestion = function(){
				
				if(counter-1>=0)
					{
						counter=counter-1;
						$rootScope.firstQuestion = questions[counter];
						$rootScope.optionsForFirstQuestion = options[counter];
						$scope.id = ids[counter];
                        $scope.answeredAnswer=subjectsAnswers[counter];
						if(counter==0)
							{
								$scope.isFirstQuestion=true;
							}
						
					}
				else{
					$scope.isFirstQuestion=true;
				}	
				
				if($scope.isLastQuestion)
					{
					   $scope.isLastQuestion=false;
					}
				
					
			}
			
						
			$scope.submit = function()
			{
				
				if($scope.minutesTerminator!= undefined)
					{
						$timeout.cancel($scope.minutesTerminator);
					}
				if($scope.hoursTerminator!= undefined)
					{
						$timeout.cancel($scope.hoursTerminator);
					}
                
                for(var a=0; a<=i; a++)
					{
						
						if(subjectsAnswers[a]==officialAnswers[a])
							{
								score = score+1
								
							}
						
					}
				$rootScope.finalScore = score;
				$location.path('results.html');
				
			}
            
            $scope.randomNavigation = function(id){
                
                        counter = id-1;
                        $rootScope.firstQuestion = questions[counter];
						$rootScope.optionsForFirstQuestion = options[counter];
						$scope.id = ids[counter];
                        $scope.answeredAnswer=subjectsAnswers[counter];
                        if(!counter-1>=0)
                            {
                                $scope.isFirstQuestion = true;
                                $scope.isLastQuestion=false;
                            }
                        if(counter==i){
                            $scope.isLastQuestion=true;
                            $scope.isFirstQuestion = false;
                        }
						
            }
            
            $scope.unattemptedQuestionsStyle={
                "background-color":"rgba(255,255,255,0.5)",
                "border-radius":"10px"
            }
        
              $scope.attemptedQuestionsStyle={
                "background-color":"#ADD8E6",
                "color":"white",
                "border-radius":"10px"
            }

            
             
        }
        else{
            $location.path('UnauthorizedAccess.html');
        }
        
    
			
	
			
				
	
}]) 


controller.controller('ResultsCtrl',['$scope','$rootScope','$location','sessionTracker', function($scope,$rootScope,$location,sessionTracker){
    
        var userId=null;
        userId=sessionTracker.getUserId();
    
        if(userId!=null){
            
            $scope.finalScore = $rootScope.finalScore;
            $scope.percentage = ($scope.finalScore/$rootScope.maximumMarks)*100;
            $scope.output=[];
            $scope.output.finalScore = $scope.finalScore;
            $scope.output.percentage = $scope.percentage;
            $rootScope.percents=$scope.percentage;
            sessionTracker.trackUser(null);
      
                 
        }
        else{
            $location.path('UnauthorizedAccess.html');
        }
	
	
}]);


controller.controller('ChartsCtrl',['$scope','$rootScope', function($scope,$rootScope){

		
		$rootScope.chartData=[$scope.finalScore,$rootScope.maximumMarks-$scope.finalScore];
		var percent=$rootScope.percents;
        var duration=500;
        var transition=200;
		var width = 460,
	  	height = 300,
	  	radius = Math.min(width, height) / 2;
    
        var dataset = {
                        lower: calcPercent(0),
                        upper: calcPercent(percent)
                      },
            format = d3.format(".0%");
    
			var color = d3.scale.category20();
	
			var pie = d3.layout.pie().sort(null);
	    
            var arc = d3.svg.arc()
                      .innerRadius(radius - 20)
                      .outerRadius(radius);

	
            var svg = d3.select("donut-chart").append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g")
                      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
            var path = svg.selectAll("path")
                        .data(pie(dataset.lower))
                        .enter().append("path")
                        .attr("class", function(d, i) { return "color" + i })
                        .attr("d", arc)
                        .each(function(d) { this._current = d; }); // store the initial values
    
            var text = svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("dy", 50);
    
            if (typeof(percent) === "string")
            {
                text.text(percent);
            }
            else 
            
            {
               var progress = 0;
                var timeout = setTimeout(function ()
                {
                    clearTimeout(timeout);
                    path = path.data(pie(dataset.upper)); // update the data
                    path.transition().duration(duration).attrTween("d", function (a)
                    {
                            // Store the displayed angles in _current.
                            // Then, interpolate from _current to the new angles.
                            // During the transition, _current is updated in-place by d3.interpolate.
                            var i  = d3.interpolate(this._current, a);
                            var i2 = d3.interpolate(progress, percent)
                            this._current = i(0);
                            return function(t) 
                            {
                                    text.text( format(i2(t) / 100) );
                                    return arc(i(t));
                            };
                    }); // redraw the arcs
             }, 200);
     
                
        }   
    
    function calcPercent(percent) {
  return [percent, 100-percent];
};
        



                      
}]);



controller.directive('donutChart',function(){

	return{
		controller:'ChartsCtrl',
		retrict:'E'
	}
})



controller.controller('UnauthorizedAccessCtrl',['$scope','$rootScope','$location','sessionTracker', function($scope,$rootScope,$location,sessionTracker){
    
    $scope.login = function(){
         $location.path('')
    }   
    
	
}]);
