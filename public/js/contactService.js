/*The service layer for the frontend*/
var saveMyContactsApp = angular.module('saveMyContactsApp',['ngResource']);

saveMyContactsApp.service('contactService',function($http){

  this.findAllContact = function(){
    return $http.get('/contact').then(function(data){
      console.log(">>>>>>>><",data);
      return data.data;
    });
    //return [{"name":"lucas","fone":9832749, "email":"lucas@remail.com"}]
  }

});
