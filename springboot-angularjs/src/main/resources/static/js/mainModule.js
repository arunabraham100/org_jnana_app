var myApplication = angular.module('myApplication',['ngRoute','searchModule','validController','registerModule','adminModule','reportsModule','bmModule','angular-jqcloud','tangcloud','euTree.directive','ngAnimate', 'ngSanitize', 'ui.bootstrap']);



myApplication.config(['$routeProvider',
                      function($routeProvider) {
                          $routeProvider.
                          when('/main', {
                              templateUrl: '/views/search.jsp',
                              controller: 'searchCtrl'                              	
                                }).when('/Reports',{ 
                                	
                                	templateUrl:'/views/Reports.jsp',
                                	controller:'reportsController'  
                                		
                                }).when('/Login',{                                 	
                                	templateUrl:'/views/loginPage.jsp',
                                	controller:'LoginCtrl' 
                                		
                                }).when('/Register',{                              	
                                	templateUrl:'/views/Register.jsp',
                                	controller:'RegCtrl'   
                                		
                                }).when('/Result',{                                	
                                	templateUrl:'/views/Result.jsp',
                                	  controller: 'searchCtrl'  
                                		  
                                }).when('/Admin',{                                	
                                	templateUrl:'/views/admin.jsp',
                                	controller:'adminsController'
                                	
                                }).when('/bookmark',{                                		
                                		templateUrl:'/views/bookmark.jsp',
                                		controller:'bmController'
                                			
                                	}).when('/404',{
                                        templateUrl: '/views/404.jsp'   
                                        	
                                    }).otherwise({    	
                                		
                              redirectTo: '/main'
                          });
                      }]);

myApplication.controller('myController', function($scope, $route, $location) {
	  $scope.$on('$routeChangeSuccess', function() {
	    var path = $location.path();
	    if(path === '/Login') {
	       $scope.urlShow = false;
	    } else if(path === '/main'||path === '/Reports'||path === '/Register'||path === '/Result'||
	    		path === '/Admin'||path === '/bookmark'||path === '/404') {
	       $scope.urlShow = true;
	    }
	  });
	});