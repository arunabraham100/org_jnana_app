var reports=angular.module('reportsModule',[]);

reports.controller('reportsController',['$scope', '$http', '$rootScope', '$location',
                                function($scope, $http, $rootScope, $location) {
	
	
	  $scope.names = ["Monthly", "Yearly", "Daily"];
	  $scope.selectedOption=$scope.names[0];
	
	
}]);	