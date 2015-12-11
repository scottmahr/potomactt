var app = angular.module("twc");

app.controller('AnalysisCtrl', ['$scope','$mdDialog','FormState','FormGlobals','FormLifts', 
      function($scope,$mdDialog,FormState,FormGlobals,FormLifts){
    $scope.s = FormState;
    
    $scope.m ={
        
    }

    //We should load lifts
    console.log('we are loading lifts')
    FormLifts.getLifts();
    

    $scope.liftChecked = function(liftID){

        //uncheck all of the other boxes
        _.each(FormState.lifts,function(lift){
            if(lift._id==liftID){
                console.log('lift:',lift)
                $scope.$emit('loadLift', {lift:lift});
                return;
            }
            lift.checked = false;
        });
    }

    
    

}]);


function DialogController($scope,$timeout,$mdDialog,FormState,FormEditState,FormLifts ) {
    $scope.s = FormState;
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.setLifter = function(lifter){
        FormEditState.setLifter(lifter);
    }

    $scope.setLift = function(liftID){
        console.log('setting lift',liftID)
        FormEditState.setSelectedLiftByID(liftID);
        $mdDialog.hide();
    }

    $scope.pickLifter = function(lifterID) {
        
        _.each(_.where(FormState.lifts,{checked:true}),function(lift,idx){
            
            $timeout(function(){
                console.log('Moving...',lift)
                FormLifts.updateLift({lifterID:lifterID},lift);
            },1000*idx)
        });

        console.log('you picked lifter'+lifterID)
        $mdDialog.hide();
    };

    $scope.orderByLength = function(lifter){
        return -lifter.lifts.length;
    }
}