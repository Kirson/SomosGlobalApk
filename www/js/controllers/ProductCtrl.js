angular.module('starter.ProductCtrl',[])
.controller('ProductCtrl', function($scope, $stateParams, $timeout,  Products, Shops,ionicMaterialInk, ionicMaterialMotion) {

    //console.log("product ctrl");
	//$scope.shop = Shops.get($stateParams.shopId);
	$scope.products = Products.getProducts();
	$scope.hasProducts = true;
	$scope.showGallery=false;
console.log("productos");
console.log($scope.products);

	// if ($stateParams.shopId != undefined){
	// 	$scope.shops = Shops.get($stateParams.shopId);
	// }
	
	// function chunk(arr, size) {
	//   var newArr = [];
	//   for (var i=0; i<arr.length; i+=size) {
	//     newArr.push(arr.slice(i, i+size));
	//   }
	//   return newArr;
	// }

	//$scope.chunkedData = chunk($scope.shops, 1);// to make 2 columns

    //$scope.product = Products.get($stateParams.shopId);
    //console.log( $scope.product );

    //if($scope.product==undefined){
    //	$scope.hasProducts=false;
    //}

    $timeout(function () {
    ionicMaterialMotion.fadeSlideInRight();
}, 300);
});
