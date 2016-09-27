angular.module('starter.ShopCtrl', ['ngCordova'])
.controller('ShopCtrl', function($scope, $stateParams, $timeout,  Shops, Categories,  $cordovaSocialSharing ,$window) {

	// $scope.chunkedData = null;
	Shops.getLocales($stateParams.catId).then(function(shops){
			$scope.shops =  shops;
			    console.log( "sub category ==>" + $stateParams.catId);
			    // console.log(  $scope.categories );
			    $scope.chunkedData = chunk($scope.shops, 1);// to make 2 columns
			    console.log("shops " +$scope.shops);
	});
	// console.log("out" +$scope.shops);
	/*
	$scope.shops = [];
	for (var i = 0; i < $scope.allShops.length; i++) {
		if ($scope.allShops[i].catId === $stateParams.catId) {
		  $scope.shops.push( $scope.allShops[i] ) ;
		}
	}
    */
	//console.log($scope.shops);
	//console.log($stateParams.shopId);
	if ($stateParams.shopId != undefined){
		$scope.shops = Shops.get($stateParams.shopId);
	}
	
	function chunk(arr, size) {
	  var newArr = [];
	  for (var i=0; i<arr.length; i+=size) {
	    newArr.push(arr.slice(i, i+size));
	  }
	  return newArr;
	}

// var output = "";
// for (var property in $cordovaSocialSharing) {
//   output += property + ': ' + $cordovaSocialSharing[property]+'; ';
// }
// console.log(output);

	$scope.shareAnywhere = function(message, image, link) {
        $cordovaSocialSharing.share(message, image, link);    
    }
 
    $scope.shareViaTwitter = function(message, image, link) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link).then(function(result) {

        }, function(error) {
            alert("Imposible compartir en Twitter");
        });
    }
    $scope.shareViaFb = function(message, image, link) {
            $cordovaSocialSharing.shareViaFacebook(message, image, link).then(function(result) {

        }, function(error) {
            alert("Imposible compartir en Facebook");
        });
    }

})
