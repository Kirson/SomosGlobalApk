angular.module('starter.CategoryCtrl', [])
.controller('CategoryCtrl', function($scope, $stateParams, $timeout,  Categories, ionicMaterialInk) {
	
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.showHeader();
        //$scope.$parent.clearFabs();
        $scope.isExpanded = false;
       // $scope.$parent.setExpanded(false);
       // $scope.$parent.setHeaderFab(false);
    }, 0);
    ionicMaterialInk.displayEffect();

	console.log("id " + $stateParams.catId );
	if ($stateParams.catId === undefined){

	    $scope.allCategories = Categories.getCategories().then(function(allCategories){
			$scope.categories =  allCategories;
		    console.log( "category ctrl" );
		     console.log(  $scope.categories );
			
		});
		// $scope.url = "subcategory";// este manda a las subcategorías
		$scope.url = "sucategoryDetail";// este manda a los locales
	}
	/*
	else{

		if ($stateParams.catId.length == 2){
		    
		    $scope.allCategories = Categories.getSubCategoriesNivel1($stateParams.catId).then(function(subCategories){
				$scope.categories =  subCategories;
			    console.log( "sub category 1" + $stateParams.catId);
			    // console.log(  $scope.categories );
				
			});
			$scope.url = "subcategory";
		}
		if ($stateParams.catId.length == 4){
		$scope.allCategories = Categories.getSubCategoriesNivel2($stateParams.catId).then(function(subCategories){
			$scope.categories =  subCategories;
			    console.log( "sub category  2" + $stateParams.catId);
			    // console.log(  $scope.categories );
			});
			$scope.url = "sucategoryDetail";
		}
	}*/
});
