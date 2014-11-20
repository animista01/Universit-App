angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicLoading, AppServices, $ionicViewService, $state){
  $scope.login = function (loginData){
    if(loginData.username && loginData.password){
      $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
      var result = AppServices.login(loginData.username, loginData.password);
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

.controller('HomeCtrl', function ($scope, $rootScope, $state, AppServices, $ionicLoading){
  token = localStorage.getItem("token");
  $scope.load = function (){
    if(typeof $rootScope.homeworks === 'undefined'){
      $ionicLoading.show({template: '<i class="icon ion-looping"></i><p>Trayendo las tareas...</p>'});
      var result = AppServices.getHomeworks(token);
      result.then(function (data){
        if(data.status == 401){
          $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2500, showBackdrop: false});
        }else{
          $rootScope.name = data.name;
          $rootScope.homeworks = data.homeworks;
          $rootScope.cards = Array.prototype.slice.call($rootScope.homeworks, 0, 0);
          $ionicLoading.hide();
        }
      }, function (err){
        $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
      });
    }else{
      $scope.data = {
        hide: false
      };  
    }
  }

  $scope.cardSwiped = function (index){
    $scope.addCard();
  };
  $scope.cardDestroyed = function (index){
    $rootScope.cards.splice(index, 1);
  }
  $scope.addCard = function(){
    var newCard = $rootScope.homeworks[Math.floor(Math.random() * $rootScope.homeworks.length)];
    newCard.id = Math.random();
    $rootScope.cards.push(angular.extend({}, newCard));
  }

  $scope.moreInfo = function (tarea_id){
    $state.go('app.detail', {"tareaId": tarea_id});
  }
})

.controller('HomeworkDetailCtrl', function ($scope, AppServices, $ionicLoading, $cordovaSocialSharing, $cordovaLocalNotification, $stateParams){
  $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
  $scope.init = function (){
    var result = AppServices.getOne($stateParams.tareaId);
    result.then(function (data){
      $scope.homeworkDetail = data;
      $ionicLoading.hide();
    }, function (err){
      $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
    });
  }
  $scope.reminder = function (tarea_id, message){
    var d = new Date();
    d.setHours(20); 
    $cordovaLocalNotification.add({
      id: tarea_id,
      title: "Recordatorio de tarea",
      message: message,
      date: d,
    }).then(function (){
      console.log('callback for adding background notification');
    });
  }
  $scope.share = function (tarea_url){
    $cordovaSocialSharing.share("Ojo con esta tarea", null, null, tarea_url)
    .then(
        function (result){
      },
        function (err){
        $ionicLoading.show({template: '<p>Algo salio mal</p>', duration: 1500, showBackdrop: false});
      }
    );
  }
  $scope.openIn = function (tarea_url){
    var ref = window.open(tarea_url, '_blank');
  }

})

.controller('ProfileCtrl', function ($scope){

});
