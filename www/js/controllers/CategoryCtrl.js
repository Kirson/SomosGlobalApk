angular.module('starter.CategoryCtrl', [])
.controller('CategoryCtrl', function($scope, $stateParams, $timeout,  Categories) {
	console.log("id " + $stateParams.catId );
	if ($stateParams.catId === undefined){

	    $scope.allCategories = Categories.getCategories().then(function(allCategories){
			$scope.categories =  allCategories;
		    console.log( "category ctrl" );
		    // console.log(  $scope.categories );
			
		});
		$scope.url = "subcategory";
	}
	else{

		if ($stateParams.catId.length == 2){
		    
		    $scope.allCategories = Categories.getSubCategoriesNivel1($stateParams.catId).then(function(subCategories){
				$scope.categories =  subCategories;
			    console.log( "sub category " + $stateParams.catId);
			    // console.log(  $scope.categories );
				
			});
			$scope.url = "subcategory";
		}
		if ($stateParams.catId.length == 4){
		$scope.allCategories = Categories.getSubCategoriesNivel2($stateParams.catId).then(function(subCategories){
			$scope.categories =  subCategories;
			    console.log( "sub category " + $stateParams.catId);
			    // console.log(  $scope.categories );
			});
			$scope.url = "sucategoryDetail";
		}
	}
});
