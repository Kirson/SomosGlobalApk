angular.module('starter.ProductCtrl',[])
.controller('ProductCtrl', function($scope, $stateParams, $timeout,  Products, Shops,
									ActorReferences, ionicMaterialInk, ionicMaterialMotion) {

	var imageReferences = [];
	var references = [];
   
	$scope.hasProducts = false;
	$scope.showGallery=false;
	$timeout(function() {
    	references = ActorReferences.getReferences($stateParams.shopId).then(function(data){
    		console.log( "product ctrl" );
    	
			$scope.references = data;
    		console.log(  $scope.references);

	    });
    }, 1000);
    console.log("1 references");
    console.log(references);
    console.log("2 references");
    console.log($scope.references);


    console.log("image references");
    /*
    for (var i=0; i<$scope.references.length; i+=size) {
    	console.log(i);
	    if($scope.references[i].idCg.idCg==82){
           	console.log("+++++");
           	 imageReferences.push(item);
           }
	  };

*/
       var j=0;
	  angular.forEach($scope.references,function(item){
           console.log(j);
           console.log(item);
           j++;
           /*
            if (item.idCg.idCg==82) {
                console.log("111");
            }else{
            	console.log("222");
            }*/
        });

  console.log(imageReferences);

    $timeout(function () {
    	ionicMaterialMotion.fadeSlideInRight();
	}, 300);


});
