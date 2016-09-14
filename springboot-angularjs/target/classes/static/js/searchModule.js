var result=angular.module('searchModule',['angular-jqcloud','ui.bootstrap','angularUtils.directives.dirPagination']);

result.controller('searchCtrl',['$scope', '$http', '$rootScope', '$location','$sce',
                   function($scope, $http, $rootScope, $location,$sce) {	
	
	$scope.myVal=false;
	 $scope.item = {
			    bookmark: false
			  };
	 
	
	 	/*method to open documents */
	 
	 $scope.openDoc=function(url){
		 
		  $http.get('/openDoc',{params: {'url': url}}).success(function(data){
				
				
		});
		 
	 }
	 
	 	/*	Get words for clout implementation  */
	 
	$http.get('/getWords').success(function(data) {
		
		  $rootScope.words = data;
});
	
	 $scope.test = function(word) {
        
		 var words=word;
         $http.get('/getAll',{params: {'query': words}}).success(function(data){
				
				$rootScope.documents={};
				$rootScope.documents = data;
				 $location.path('Result');
						
			})
     }
	 $scope.rating = 1;
	 
	   $rootScope.avgRate=1;
	
	
	$scope.roleList = [{
        "roleName": "C:",
            "roleId": "role1",
            "children": [
                         {
            "roleName": "Downloads",
                "roleId": "role12",
                "children": [
           {
                "roleName": "Eclipse",
                    "roleId": "role13",
                    "children": [
           {
                    "roleName": "Jnana",
                        "roleId": "role14",
                        "children": [
                 {
                    "roleName": "File",
                        "roleId": "role15",
                        "children": []
                 }]
           
                }]
            }]
        }]
    }, 
    ];
	
	
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	
	$scope.starRating3 = 0;
	
	
	$scope.changeclass=function(){
		document.getElementsByClassName("tablinks")[1].setAttribute("class","active");
	}
	
	
	
	$scope.openopt=function(evt, opName) {

	    // Declare all variables
	    var i, tabcontent, tablinks;

	    // Get all elements with class="tabcontent" and hide them
	    tabcontent = document.getElementsByClassName("tabcontent");
	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }

	    // Get all elements with class="tablinks" and remove the class "active"
	    tablinks = document.getElementsByClassName("tablinks");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }

	    // Show the current tab, and add an "active" class to the link that opened the tab
	    document.getElementById(opName).style.display = "block";
	   /* evt.currentTarget.className += " active";
	    evt.currentTarget.className += " changed";*/
	}
	
	$scope.init=function($evt,wordcloud){
		$scope.openopt($evt,wordcloud);
		$scope.changeclass();
	}
	/* $scope.curPage = 0;
	 $scope.pageSize = 5;*/
	
	  			
	  			  
	  			
	  			  $scope.resultValidate=function(){	
	  				  
	  			$rootScope.searchVal=$scope.searchtag;
	  			var searchValue=$rootScope.searchVal;
	  			if(searchValue==null){
	  					
	  				alert("Search field is blank.Please provide a serach query to proceed!");
	  				
	  			}
	  		else{
	  			          	
	  		$http.get('/getAll',{params: {'query': searchValue}}).success(function(data){
	  					
	  					$rootScope.documents={};
	  					$rootScope.documents = data;
	  					 $location.path('Result');
	  				}).error(function(data){
	  					$location.url('/404');
	  				})
	  			  }
		}
		
		$scope.resultValidateReload=function(){
			 
			$rootScope.searchVal=$scope.searchtag;
  			var searchValue=$rootScope.searchVal;
  			if(searchValue==null){					
  				alert("Search field is blank.Please provide a serach query to proceed!");  				
  			}
  		else{  			          	
  		$http.get('/getAll',{params: {'query': searchValue}}).success(function(data){
  												
  														
  					$rootScope.documents={};
  					$rootScope.documents = data;
  					$location.path('Result'); 							
  				}).error(function(data){
  					
  					$location.url('/404');
  				})
  			  }
		}  
		
		 $scope.test = function(word) {
		        
			 var words=word;
	         $http.get('/getAll',{params: {'query': words}}).success(function(data){
					
					$rootScope.documents={};
					$rootScope.documents = data;
					//alert($rootScope.documents);
					 $location.path('Result');
							
				})
	     }
		 
		 		/* Save bookmark for documents */
		 
		 $scope.bookMrk=function(event,name,path){
			 	var user_id="inf@global";
			    $scope.colors = $(event.currentTarget).css('color');
			    if( $scope.colors == "rgb(0, 0, 0)"){
			    	var status=1;
				 	var bookmark={"user_id":user_id,
				 			"doc_name":name,
				 			"doc_url":path,
				 			"status":status};

				 	var req = {
				 		method : 'POST',
				 		url : 'saveBookmark',
				 		headers : {
				 			'Content-Type' : 'application/json'
				 		},
				 		data : bookmark
				 	};

				 	$http(req).success(function(data, status, headers, config) {
				 		
				 		alert("Thanks u for bookmarking the file : "+name);
				 	}).error(function(data, status, headers, config) {	
			
				 	});
			    	
			    }
			    else{
			    	$http.delete('/removeBookmark',{params: {'user_id':user_id,'doc_path':path}}).success(function(response){
			    		alert("Bookmark removed for document "+name);
					  }).error(function(){
						  
					  });
			    }
		 }
	  		
		
		 		/* Show document details in preview section	  */
		 
	    $scope.showDetails=function(name,size,author,avgRate,rateCount){
	    	$scope.myVal=true;
	    	//$scope.fileNames=name;
	    	$rootScope.nameLatest=name;
	    	$rootScope.fileSiz=size;
	    	$rootScope.Author=author;
	    	$rootScope.avgRate=avgRate;
	    	$rootScope.rateCounts=rateCount;
	    	//alert($rootScope.nameLatest);
	    	
	    }
	    
	    
	    $scope.highlight = function(haystack, needle) {
	        if(!needle) {
	            return $sce.trustAsHtml(haystack);
	        }
	        return $sce.trustAsHtml(haystack.replace(new RegExp(needle, 'gi'), function(match) {
	            return '<span class="highlight">' + match + '</span>';
	        }));
	    };
	    
	    $scope.saveRating = function(rating,fileName) {	    	
		 var intRating=parseInt(rating);
		 	var userId="inf@global";
		 	var doc=$rootScope.docId;
		 	var rating={"rating":intRating,"docId":fileName,"userId":userId};//if the id is autoGenerated in business logic send only  rating

		 	var req = {
		 		method : 'POST',
		 		url : 'saveRating',
		 		headers : {
		 			'Content-Type' : 'application/json'
		 		},
		 		data : rating
		 	};

		 	$http(req).success(function(data, status, headers, config) {
		 		
		 		alert("Thanks u for rating the file : "+fileName);
		 	}).error(function(data, status, headers, config) {	
	
		 	});

		 	
		 };
	    
	  			$scope.PreviewImage= function(src) {
	  				 
	  		      	var fullPath = src;
	  		      	//alert(fullPath);
	  		      	if (fullPath) {
	  		      	    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
	  		      	    var filename = fullPath.substring(startIndex);
	  		      	    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
	  		      	        filename = filename.substring(1);
	  		      	    }
	  		      	    
	  		      	}
	  		      	var ext = filename.substr(filename.lastIndexOf('.') + 1);
	  		      	 $("#video").empty();
	  		      	if(ext=='pdf'||ext=='docx')
	  		      		{
	  		         var pdfObject="<object data='"+fullPath+"' type='application/pdf' width='300' height='200'>";
	  		         pdfObject=pdfObject+ "alt : <a href='"+fullPath+"'>pdffile_url</a> </object>";
	  		         $("#video").append(pdfObject);
	  		      		}
	  		      	else if(ext=='mp4')
	  		      		{
	  		      		
	  		      		var src = "<video width='320' height='240' controls src='"+fullPath+"' type='video/wmv'></video>";
	  		      		$("#video").append(src);
	  		      		}
	  			 }
	  			
	  			
	
}]);

angular.module('euTree.directive', [])
.directive('treeElement', function ($compile) {
return {
    restrict: 'E', //Element
    link: function (scope, element, attrs) {
        scope.tree = scope.node;

        var visibility = (attrs.nodeState != "collapse") || 'style="display: none;"';

        if (scope.tree.children.length) {
            for (var i in scope.tree.children) {
                if (scope.tree.children[i].children.length) {
                    scope.tree.children[i].className = "eu_" + attrs.nodeState + " eu_deselected";
                } else {
                    scope.tree.children[i].className = "eu_child" + " eu_deselected";
                }
            }

            var template = angular.element('<ul ' + visibility + '><li ng-repeat="node in tree.children" node-id={{node.' + attrs.nodeId + '}} ng-class="node.className">{{node.' + attrs.nodeName + '}}<tree-element tree="node" node-id=' + attrs.nodeId + ' node-name=' + attrs.nodeName + ' node-state=' + attrs.nodeState + '></tree-element></li></ul>');

            var linkFunction = $compile(template);
            linkFunction(scope);
            element.replaceWith(template);
        } else {
            element.remove();
        }
    }
};
})
.directive('euTree', function ($compile) {
return {
    restrict: 'E', //Element
    link: function (scope, element, attrs) {
        scope.selectedNode = null;

        //CSS for TREE
        var sheet = document.createElement('style')
        sheet.innerHTML =
            "eu-tree ul{margin:0;padding:0;list-style:none;border:none;overflow:hidden;text-decoration:none;color:#555}" +
            "eu-tree li{position:relative;padding:0 0 0 20px;font-size:13px;font-weight:initial;line-height:18px;cursor:pointer}" +
            "eu-tree .eu_expand{background:url(" + attrs.expandIcon + ") no-repeat}" +
            "eu-tree .eu_collapse{background:url(" + attrs.collapseIcon + ") no-repeat}" +
            "eu-tree .eu_child{background:url(" + attrs.childIcon + ") no-repeat}" +
            "eu-tree .eu_selected{font-weight:bold;}" +
            "eu-tree .hide{display:none;}" +
            "eu-tree .eu_deselected{font-weight:normal;}";
        document.body.appendChild(sheet);


        scope.$watch(attrs.treeData, function (val) {
            for (var i in scope[attrs.treeData]) {
                if (scope[attrs.treeData][i].children.length) {
                    scope[attrs.treeData][i].className = "eu_" + attrs.nodeState + " eu_deselected";
                } else {
                    scope[attrs.treeData][i].className = "eu_child" + " eu_deselected";
                }
            }

            var template = angular.element('<ul id="euTreeBrowser" class="filetree treeview-famfamfam treeview"><li ng-repeat="node in ' + attrs.treeData + '" node-id={{node.' + attrs.nodeId + '}} ng-class="node.className">{{node.' + attrs.nodeName + '}}<tree-element tree="node" node-id=' + attrs.nodeId + ' node-name=' + attrs.nodeName + ' node-state=' + attrs.nodeState + '></tree-element></li></ul>');

            var linkFunction = $compile(template);
            linkFunction(scope);
            element.html(null).append(template);



            //Click Event
            angular.element(document.getElementById('euTreeBrowser')).unbind().bind('click', function (e) {
                if (angular.element(e.target).length) {
                    scope.previousElement = scope.currentElement;

                    scope.currentElement = angular.element(e.target);

                    scope.$broadcast('nodeSelected', {
                        selectedNode: scope.currentElement.attr('node-id')
                    });

                    if (scope.previousElement) {
                        scope.previousElement.addClass("eu_deselected").removeClass("eu_selected");
                    }
                    scope.currentElement.addClass("eu_selected").removeClass("eu_deselected");

                    if (scope.currentElement.children().length) {
                        scope.currentElement.children().toggleClass("hide");
                        //$(e.target).children().slideToggle("fast");

                        scope.currentElement.toggleClass("eu_collapse");
                        scope.currentElement.toggleClass("eu_expand");
                    }
                }

            });



        }, true);
    }
};
});

result.directive('starRating',
		function() {
			return {
				restrict : 'A',
				template : '<ul class="rating">'
						 + '	<li ng-repeat="star in stars" ng-class="star" ng-mouseenter="isolatedMouseHover($index + 1)" ng-mouseleave="isolatedMouseLeave($index + 1)" ng-mouseleave="isolatedMouseLeave($index + 1)" ng-click="toggle($index)">'
						 + '\u2605'
						 + '</li>'
						 + '</ul>',
				scope : {
					ratingValue : '=',
					max : '=',
					onRatingSelected : '&'
				},
				link : function(scope, elem, attrs) {
					var updateStars = function() {
						scope.stars = [];
						for ( var i = 0; i < scope.max; i++) {
							scope.stars.push({
								filled : i < scope.ratingValue
							});
						}
					};
					
					scope.toggle = function(index) {
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							rating : index + 1
						});
					};
					
					scope.$watch('ratingValue',
						function(oldVal, newVal) {
							if (newVal) {
								updateStars();
							}
						}
					);
				}
			};
		}
	);
result.directive('starRatings',
		function() {
			return {
				restrict : 'A',
				template : '<ul class="rating">'
						 + '<li ng-repeat="star in stars" ng-class="star" >'
						 + '\u2605'
						 + '</li>'
						 + '</ul>',
				scope : {
					ratingValue : '=',
					max : '=',
					onRatingSelected : '&'
				},
				link : function(scope, elem, attrs) {
					var updateStars = function() {
						scope.stars = [];
						for ( var i = 0; i < scope.max; i++) {
							scope.stars.push({
								filled : i < scope.ratingValue
							});
						}
					};
					
					scope.toggle = function(index) {
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							
							rating : index + 1
						});
					};
					
					scope.$watch('ratingValue',
						function(oldVal, newVal) {
							if (newVal) {
								updateStars();
							}
						}
					);
				}
			};
		}
	);


result.directive('buttonBookmark', function(){
	  return {
		    scope: true,
		    restrict: 'E',
		    bookVal: '=',
		    onBookSelected: '&',
		    template: '<span style="font-size:12px;cursor:pointer;"  class="glyphicon glyphicon-bookmark" ng-class="{active:item.bookmark||item.status==1}" ng-click="bookMrk($event,item.fileName,item.url)"></span>',
		    link: function($scope, elem) {
		      elem.bind('click', function() {

		        $scope.$apply(function() {
		        	
		        	if($scope.item.status==1){
		        		 
		        		 $scope.item.bookmark = !$scope.item.bookmark;
		        		 $scope.item.status= 0;
		        		 elem.removeClass('active');
		        		 $scope.item.bookmark = !$scope.item.bookmark;
		        		 return;
		        	}else{	        		
		        		
		        	}
		        	// $scope.item.status= 0;
		        	 $scope.item.bookmark = !$scope.item.bookmark;
		        	 //$scope.value = 1;
		       
		        });
		      });
		    }
		  };
		});

