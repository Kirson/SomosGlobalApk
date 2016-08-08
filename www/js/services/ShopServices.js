'use strict';

angular.module('starter.ShopServices', [])
.factory('Shops', function($http , $rootScope) {
/*
var str ="";
for (var i = 1; i < 21; i++) {
  str += '{ "id" :"'+i+'", "name": "Local '+i+'", "img":  "img/category/logos/logo'+i+'.jpg" },';
}
str += str +' { "id": "21", "name": "Local 21", "img": "img/category/logos/logo21.jpg" } ' ;

var shops = JSON.parse( "["+str +"]" );  
*/
  var shops = null
  /*[{
    id: 1,
    name: 'Bela Express',
    logoId: '1',
    catId: '2',
    img : 'img/category/logos/logo1.jpg'
  },

  {
    id: 2,
    name: 'Sur Parrilla Gourmet',
    logoId: '2',
    catId: '0',
    img : 'img/category/logos/logo2.jpg'
  },

  {
    id: 3,
    name: 'Fitness Factory',
    logoId: '3',
    catId: '2',
    img : 'img/category/logos/logo3.jpg'
  },
  {
    id: 6,
    name: 'Carolina Inn',
    logoId: '6',
    catId: '6',
    img : 'img/category/logos/logo6.jpg'
  },
  {
    id: 4,
    name: 'Chakra',
    logoId: '4',
    catId: '1',
    img : 'img/category/logos/logo4.jpg'
  },
  {
    id: 7,
    name: 'Win Cleaners',
    logoId: '7',
    catId: '4',
    img : 'img/category/logos/logo7.jpg'
  },
  {
    id: 20,
    name: 'Clinica Primavera',
    logoId: '20',
    catId: '1',
    img : 'img/category/logos/logo20.jpg'
  }
  ,
  {
    id: 8,
    name: 'Dr Celular',
    logoId: '8',
    catId: '4',
    img : 'img/category/logos/logo8.jpg'
  }
  ,
  {
    id: 5,
    name: 'Parrillon',
    logoId: '5',
    catId: '0',
    img : 'img/category/logos/logo5.jpg'
  }
  ,
  {
    id: 17,
    name: 'Chosen Bar',
    logoId: '17',
    catId: '0',
    img : 'img/category/logos/logo17.jpg'
  },
  {
    id: 32,
    name: 'Kubamed',
    logoId: '32',
    catId: '1',
    img : 'img/category/logos/logo32.jpg'
  },
  {
    id: 27,
    name: 'Evelyn',
    logoId: '27',
    catId: '3',
    img : 'img/category/logos/logo27.jpg'
  },
  {
    id: 9,
    name: 'Hospital Inglés',
    logoId: '9',
    catId: '1',
    img : 'img/category/logos/logo9.jpg'
  },
    {
    id: 10,
    name: 'Redux Clínica Estética',
    logoId: '10',
    catId: '2',
    img : 'img/category/logos/logo10.jpg'
  },
  {
    id: 11,
    name: 'Torres y Torres',
    logoId: '11',
    catId: '4',
    img : 'img/category/logos/logo11.jpg'
  },
  {
    id: 12,
    name: 'Coaching de Mentalidad',
    logoId: '12',
    catId: '4',
    img : 'img/category/logos/logo12.jpg'
  },
  {
    id: 13,
    name: 'Sol Blanco',
    logoId: '13',
    catId: '4',
    img : 'img/category/logos/logo13.jpg'
  },
  {
    id: 14,
    name: 'Scissors',
    logoId: '14',
    catId: '2',
    img : 'img/category/logos/logo14.jpg'
  },
  {
    id: 15,
    name: 'Revista Vive Light',
    logoId: '15',
    catId: '4',
    img : 'img/category/logos/logo15.jpg'
  },
  {
    id: 16,
    name: 'San Telmo',
    logoId: '16',
    catId: '0',
    img : 'img/category/logos/logo16.jpg'
  },
  {
    id: 18,
    name: 'De Morfi',
    logoId: '18',
    catId: '0',
    img : 'img/category/logos/logo18.jpg'
  },
  {
    id: 19,
    name: 'Los Troncos',
    logoId: '19',
    catId: '0',
    img : 'img/category/logos/logo19.jpg'
  },
  {
    id: 21,
    name: 'Somos Global',
    logoId: '21',
    catId: '4',
    img : 'img/category/logos/logo1.jpg'
  },
  
  ];*/

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

