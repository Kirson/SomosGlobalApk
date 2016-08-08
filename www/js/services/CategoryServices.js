'use strict';

angular.module('starter.CategoryServices', [])
.factory('Categories', function($http, $rootScope) {
var categories;

  return {
    // all: function() {
    //   return categories;
    // },

    getCategories: function(){
        return $http.get($rootScope.restUrl+"com.somosglobal.rest.categoria"
              ).then(function(response){
                console.log(response.data);
                categories = response.data;
                return categories;
      });
    },
    getSubCategoriesNivel1: function(catId){
        return $http.get($rootScope.restUrl+"com.somosglobal.rest.categoria/subcategory/1/"+catId
              ).then(function(response){
                console.log(response.data);
                categories = response.data;
                return categories;
      });
    },
    getSubCategoriesNivel2: function(catId){
        return $http.get($rootScope.restUrl+"com.somosglobal.rest.categoria/subcategory/2/"+catId
              ).then(function(response){
                console.log(response.data);
                categories = response.data;
                return categories;
      });
    },
    remove: function(id) {
      // categories.splice(categories.indexOf(id), 1);
    },
    
  };
});