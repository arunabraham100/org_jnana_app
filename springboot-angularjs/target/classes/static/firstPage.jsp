<!DOCTYPE html>
<html ng-app="myApplication" ng-controller="myController">

    	<head>  
    	
    	<meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
     	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" ></meta> 
     	<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
     	     
        <title>Jnana</title> 
        
        <!-- Latest compiled JavaScript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>    
      	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script> 
      	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js"></script> 
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>         
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap.min.js"></script>
        <script type="text/javascript" src="http://code.angularjs.org/1.4.5/angular-animate.js"></script>
          <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.js"></script>  
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
       
        <script src="/js/jqcloud-1.0.4.min.js"></script>
        <script src="/js/angular-jqcloud.js"></script>
        <link rel="stylesheet" href="css/jqcloud.css"></link>
        <script type="text/javascript" src="./js/dirPagination.js"></script>
        <script type="text/javascript" src="./js/mainModule.js"></script>
        <script type="text/javascript" src="./js/searchModule.js"></script>
        <script type="text/javascript" src="./js/adminModule.js"></script>
        <script type="text/javascript" src="./js/reportsModule.js"></script>
        <script type="text/javascript" src="./js/bmModule.js"></script>
        <script type="text/javascript" src="./js/tangCloud.min.js"></script>
        <script type="text/javascript" src="./js/headerSty.js"></script>
          <script type="text/javascript" src="./js/validController.js"></script>
        <script type="text/javascript" src="./js/registerController.js"></script>
        <link href="/css/footer.css" type="text/css" rel="stylesheet"></link>  
        <link href="/css/main.css" type="text/css" rel="stylesheet"></link>
        <link href="/css/cloud.css" type="text/css" rel="stylesheet"></link>
         <link href="/css/404.css" type="text/css" rel="stylesheet"></link>
       
        <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css"></link>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>
		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"></link>    
        <style type="text/css">
[ng\:cloak], [ng-cloak], .ng-cloak {
	display: none !important;
}
</style>
   </head>
    <body style="background-color:white">
      <div class="container">
     <!-- <div ng-include="'views/Header.jsp'" ng-show="urlShow"></div> -->
     <div ng-include="'views/Header.jsp'"></div>
     
        <ng-view></ng-view>
        </div>
       
    </body>   
</html>