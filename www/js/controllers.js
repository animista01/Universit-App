angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicLoading, LoginService, $ionicViewService, $state){
  $scope.login = function (loginData){
    if(loginData.username && loginData.password){
      $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
      var result = LoginService.login(loginData.username, loginData.password);
      result.then(function (data){
        if(data.status == 401){
          $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2500, showBackdrop: false});
        }else{
          localStorage.setItem("token", data.token);
          $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          $state.go('app.home');
          $ionicLoading.hide();
        }
      }, function (err){
        $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
      });
    }else{
      $ionicLoading.show({template: '<p>Necesitas llenar todos los campos</p>', duration: 2000, showBackdrop: false});
    }
  }
})

.controller('AppCtrl', function ($scope, $ionicViewService, $state){
  $scope.signout = function (){
    localStorage.removeItem('token');
    $ionicViewService.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('login');
  }
})

.controller('HomeCtrl', function ($scope, $ionicLoading, $cordovaSocialSharing){
  // $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
  var cardTypes = [
    { id_promo: 1, title: 'Desarrollar el mockup. De electiva', image: 'img/unisimon.jpg' },
    { id_promo: 2, title: 'Tarea 2', image: 'img/unisimon.jpg' },
    { id_promo: 3, title: 'OJO con la tarea 3', image: 'img/unisimon.jpg' },
    { id_promo: 4, title: 'Tarea 4', image: 'img/unisimon.jpg' },
    { id_promo: 5, title: 'Tarea 5', image: 'img/unisimon.jpg' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
  $scope.cardSwiped = function (index){
    $scope.addCard();
  };
  $scope.cardDestroyed = function (index){
    $scope.cards.splice(index, 1);
  }
  $scope.addCard = function(){
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.reminder = function (tarea_id){
    
  }
  $scope.share = function (tarea_id){
    $cordovaSocialSharing.share("Ojo con esta tarea", null, null, "http://www.unisimon.edu.co/")
    .then(
        function (result){
      },
        function (err){
        $ionicLoading.show({template: '<p>Algo salio mal</p>', duration: 1500, showBackdrop: false});
      }
    );
  }
  $scope.openIn = function (tarea_id){
    
  }
})

.controller('ProfileCtrl', function ($scope){

});
