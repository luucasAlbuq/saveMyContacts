/*Define our module that we will use in ng-app tag*/
var saveMyContactsApp = angular.module('saveMyContactsApp');


/*Creating a controller
 * ATTENTION: the array values must to be the same of the saveMyContactsApp */
saveMyContactsApp.controller('contactCtrl',['$scope', '$http','$window',
function($scope, $http, $window){

  $scope.allContacts = [];
  $scope.contact = {};
  $scope.formContact = {};

  $scope.login = function(user, password) {
    console.log(">>>>>")
    if(user == 'luucasAlbuq' && password == 'lucas123'){
      $window.location.href = '/main.html';
    }else{
      alert('Login incorrect');
    }
  }

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

  /*just store the contact that will be updated in a variavel
   *that is used in the view form
   */
  $scope.setUpUpdate = function(contact){
    var localCopy = angular.copy(contact);
    $scope.formContact = localCopy;
  }

  $scope.updateContact = function(contact){
    var id = contact._id;
    $http.put("/contact/update/"+id, contact).then(function(data){
      $scope.findAllContact();
      $scope.formContact = {};
    }).catch(function(error){
      console.log(error);
    });
  }
}]);
