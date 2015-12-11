var app = angular.module("twc");

app.controller('AdminCtrl', ['$scope','State', 
      function($scope,State){
    $scope.s = State;
 
   $scope.calculate = function(){
    State.calcSeason();
   }

   $scope.setPlayerID = function(playerID){
        State.currentPlayerID = playerID;
   }

}]);