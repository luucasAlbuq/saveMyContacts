/*Define our module that we will use in ng-app tag*/
var saveMyContactsApp = angular.module('saveMyContactsApp',[]);


/*Creating a controller
 * ATTENTION: the array values must to be the same of the saveMyContactsApp */
saveMyContactsApp.controller('contactController',['$scope', '$http', function($scope, $http){

  $scope.allContacts = [];
  $scope.contact = {};

  $scope.findAllContact = function(){
    $http.get('/contact').then(function(data){
      $scope.allContacts = data.data;
    }).catch(function(error){
      console.log(error);
    });
  }

  $scope.findOneContact = function(id){
    $http.get('/contact/'+id).then(function(data){
      $scope.contact = data.data;
    }).catch(function(error){
      console.log(error);
    });
  }

  $scope.deleteContact = function(id){
    $http.delete('/contact/delete/'+id).then(function(data){
      //update the contact list
      $scope.findAllContact();
    }).catch(function(error){
      console.log(error);
    });
  }

  $scope.createContact = function(contact){
    $http.post('/contact/create',contact).then(function(data){
      //update the contact list
      $scope.findAllContact();
    }).catch(function(error){
      console.log(error);
    });
  }
}]);
