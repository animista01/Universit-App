angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic.contrib.ui.cards'])

.run(function ($ionicPlatform, $cordovaSplashscreen){
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard){
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar){
      StatusBar.styleDefault();
    }

    function checkConnection(){
      if(typeof navigator.connection !== "undefined"){
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        return states[networkState];
      }
    }
    var connectionIs = checkConnection();
    if (connectionIs == 'No network connection'){
      console.log('crysavvy');
    }

    $cordovaSplashscreen.hide();
  });
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/cards.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.detail', {
      url: "/home/detail",
      views: {
        'menuContent' :{
          templateUrl: "templates/detail.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    });
    token = localStorage.getItem("token");
    if(token){
      $urlRouterProvider.otherwise('/app/home');
    }else{
      $urlRouterProvider.otherwise('/login');
    }
})
.directive('noScroll', function ($document){
  return {
    restrict: 'A',
    link: function($scope, $element, $attr){
      $document.on('touchmove', function (e){
        e.preventDefault();
      });
    }
  }
});
