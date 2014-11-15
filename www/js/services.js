angular.module('starter.services', [])

.service('LoginService', function ($q, $http){
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var token = localStorage.getItem("token");
  return{
    login: function (username, password){
      var defer = $q.defer();
      var xsrf = { username: username, password: password };
      $http({
        method: 'POST',
        url: 'https://universitapp.herokuapp.com/api/login',
        transformRequest: function (obj){
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: xsrf
      }).success(function (data){
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    },
    getHomeworks: function (){
      var defer = $q.defer();
      var xsrf = { token: token };
      $http({
        method: 'POST',
        url: 'https://universitapp.herokuapp.com/api/homeworks',
        transformRequest: function (obj){
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: xsrf
      }).success(function (data){
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    }
  } 
});