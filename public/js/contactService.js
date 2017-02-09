/*The service layer for the frontend*/
var saveMyContactsApp = angular.module('saveMyContactsApp',[]);

saveMyContactsApp.factory('contactService', function(){
  
});

saveMyContactsApp.service('contactService',['$http', function($http){

  this.findAllContact = function(){
    $http.get('/contact').then(function(data){
      console.log(">>>>>>>><",data);
      return data.data;
    });
    //return [{"name":"lucas","fone":9832749, "email":"lucas@remail.com"}]
  }

}]);
