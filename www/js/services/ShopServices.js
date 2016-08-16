'use strict';

angular.module('starter.ShopServices', [])
.factory('Shops', function($http , $rootScope) {
  var shops = null

  return {

    all: function() {
      return shops;
    },
    remove: function(id) {
      shops.splice(shops.indexOf(id), 1);
    },
    get: function(shopId) {
      for (var i = 0; i < shops.length; i++) {
        if (shops[i].id === parseInt(shopId)) {
          return shops[i];
        }
      }
      return null;
    },
     getLocales: function(shopId){
      // return $http.get("http://localhost:8080/SomosGlobal/webresources/com.somosglobal.rest.categoria", {
        return $http.get($rootScope.restUrl+"com.somosglobal.rest.actor/actor/"+shopId
              ).then(function(response){
                console.log(response.data);
                shops = response.data;
                return shops;
      });
    },
  };
});

