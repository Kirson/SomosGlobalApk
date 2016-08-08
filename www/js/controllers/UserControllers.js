angular.module('UserControllers', [])

.controller('WelcomeCtrl', function($scope, $state, $q, FacebookService, $ionicLoading,
                                    User, $ionicPopup) {

  //This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      //for the purpose of this example I will store user data on local storage
      FacebookService.setUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });

      $ionicLoading.hide();
      $state.go('app.activity');

    }, function(fail){
      //fail get profile info
      console.log('profile info fail', fail);
    });
  };


  //This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  //this method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

     $ionicPopup.alert({
           title: 'Información',
           template: 'Usted ingresar&aacute; a la aplicaci&oacute;n utilizando los datos de su cuenta de facebook'
         });

    facebookConnectPlugin.getLoginStatus(function(success){
     if(success.status === 'connected'){
        // the user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

				//check if we have our user saved
				var user = FacebookService.getUser('facebook');

				if(!user.userID)
				{
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {

						//for the purpose of this example I will store user data on local storage
						FacebookService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

            $rootScope.user = {
                nombre : '',
                apellido: '',
                userName : profileInfo.name,
                password: '',
                password2 : '',
                correo: profileInfo.email
            };

						$state.go('app.login');

					}, function(fail){
						//fail get profile info
						console.log('profile info fail', fail);
					});
				}else{


          $rootScope.user = {
                nombre : '',
                apellido: '',
                userName : user.name,
                password: '',
                password2 : '',
                correo: user.email
            };

					$state.go('app.login');
				}

     } else {
        //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
        //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        console.log('getLoginStatus', success.status);

			  $ionicLoading.show({
          template: 'Logging in...'
        });

        //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})


.controller('HomeCtrl', function($scope, FacebookService, $ionicActionSheet, $state, $ionicLoading){

	$scope.user = FacebookService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Esta seguro de salir?.',
			cancelText: 'Cancelar',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
					template: 'Saliendo...'
				});

        //facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('app.login');
        },
        function(fail){
          $ionicLoading.hide();
        });
			}
		});
	};
})

.controller('LoginCtrl', function($scope,$rootScope,$stateParams, $location, 
                                   $ionicLoading, User, $ionicPopup) {
 console.log("login ctrl ");

  if ($rootScope.user === undefined){
    $rootScope.user = {
                nombre : '',
                apellido: '',
                userName : '',
                password: '',
                password2 :'',
                correo:''
            };
  }
 
$scope.user = $rootScope.user;

 /* se debería mover esto a una clase Util */
 // An alert dialog
 
  $scope.login = function () {
      // console.log("nombre " + $rootScope.user.nombre);
      // var usuario = {"usrNombre" :$scope.user.userName, "usrPassword" : $scope.user.password};
   //console.log("1");
   //console.log($scope.user.userName);

  var validate = true;

      if($scope.user.userName==undefined ||$scope.user.userName==null ||$scope.user.userName==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'La c&eacute;dula es requerida'
         });
      }

   //console.log("2");
   //console.log($scope.user.password);
      if($scope.user.password==undefined ||$scope.user.password==null ||$scope.user.password==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'El password es obligatorio'
         });
      }

      if(validate){
      User.getUserByUser($scope.user.userName, $scope.user.password ).then(function(response){
        console.log( "result " + response);        
        if (response){
          $location.path('/app/profile');
          // console.log( "login true" );        
        }else{
          $ionicPopup.alert({
           title: 'Información',
           template: 'Los datos ingresados son incorrectos. El usuario no existe en el sistema'
         });
          console.log( "login false" );        
        }
      });
    }
      // $location.path('/app/profile');
 }


$scope.gotoTerms = function(){

  var validate = true;

      if($scope.user.userName==undefined ||$scope.user.userName==null ||$scope.user.userName==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'La c&eacute;dula es requerida'
         });
      }

    if($scope.user.nombre==undefined ||$scope.user.nombre==null ||$scope.user.nombre==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'El nombre es requerido'
         });
      }

      if($scope.user.apellido==undefined ||$scope.user.apellido==null ||$scope.user.apellido==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'El apellido es requerido'
         });
      }

      if($scope.user.correo==undefined ||$scope.user.correo==null ||$scope.user.correo==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'El correo es obligatorio'
         });
      }

     if($scope.user.password==undefined ||$scope.user.password==null ||$scope.user.password==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'El password es obligatorio'
         });
      }

      if($scope.user.password2==undefined ||$scope.user.password2==null ||$scope.user.password2==''){
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'Debe confirmar el password'
         });
      }

      if(!angular.equals($scope.user.password, $scope.user.password2))
      {
        validate = false;
        $ionicPopup.alert({
           title: 'Información',
           template: 'Los password no son iguales'
         });
      }

      if(validate){
         $location.path('/app/registerTerms');
    }
}


  $scope.visitanteLogin = function () {
      $location.path('/app/category');
 }

  $scope.goToRegisterUser = function () {
      $location.path('/app/register');
 }

 $scope.newUser = function () {

      console.log("nombre " + $rootScope.user.nombre);
      var usuario = {"usrNombre" :$scope.user.userName, "usrPassword" : $scope.user.password , "usrCreadoPor": "app", "usrNombre2": $scope.user.nombre +" "+$scope.user.apellido};
      User.newUser(usuario).then(function(response){
        $scope.response =  response;
          console.log( "result " + $scope.response);
          // console.log(  $scope.categories );
          $rootScope.user = {
              nombre : '',
              apellido: '',
              userName : '',
              password: '',
              password2 :'',
              correo:''
          };
        
      });
      
      $location.path('app/profile');
   }



  /*
   * Google login
  */

  $scope.googleLogin = function(){

    $ionicLoading.show({template: 'Loading...'}); 
    /*
     * Google login. This requires an API key if the platform is "IOS".
     * Example: $cordovaGooglePlus.login('yourApiKey')
    */
    $cordovaGooglePlus.login()
    .then(function(data){
      
      $scope.googleData = JSON.stringify(data, null, 4);
      $ionicLoading.hide();

    }, function(error){
      
      // Google returns error message due to which login was cancelled.
      // Depending on your platform show the message inside the appropriate UI widget
      // For example, show the error message inside a toast notification on Android
      $ionicLoading.hide();

    });
  }
})

;
