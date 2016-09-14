var bmModel=angular.module('bmModule',[]);

bmModel.controller('bmController',['$scope', '$http', '$rootScope', '$location',
                                          function($scope, $http, $rootScope, $location) {
        
	
	$scope.erroroMsg=false;
	$scope.bookmarks=["All Tags","Rating","Occurance","Visit"];
       $scope.selectedOption=$scope.bookmarks[0];
       var user_id="inf@global";
       $http.get('/getBookmarks',{params: {'user': user_id}}).success(function(data){
    	   
    	   $scope.bookmarks=data;
    	   if(!(data.length>0)){
 				$scope.bookError="No Bookmarks Found!";
 				$scope.erroroMsg=true;
 				
 			}
    	   
       });
       
       /*method to open documents */
  	 
  	 $scope.openDoc=function(url){
  		 
  		  $http.get('/openDoc',{params: {'url': url}}).success(function(data){
  				
  			
  				
  		});
  		 
  	 }
          }]);	