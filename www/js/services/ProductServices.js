'use strict';

angular.module('starter.ProductServices', [])
.factory('Products', function($http, $rootScope) {
var products;

  return {
    

    getProducts: function(){
        return $http.get($rootScope.restUrl+"com.somosglobal.rest.actor"
              ).then(function(response){
                console.log(response.data);
                products = response.data;
                return products;
      });
    },
    
    remove: function(id) {
      // categories.splice(products.indexOf(id), 1);
    },
    
  };
});