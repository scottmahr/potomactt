//This is for all the configuration we need
var app = angular.module("twc");

//FormMetrics has all of the methods that will deal with metrics
app.factory('FormLifters', ['$rootScope','Restangular','FormGlobals', 'FormState' ,'FormEditState' ,
            function($rootScope, Restangular, FormGlobals, FormState,FormEditState) {
    var fs = FormState;
    //Setting up lifter stuff
    var liftersBase = Restangular.all('lifters');
    var liftersList =  liftersBase.getList();
    
    liftersList.then(function(liftersResult) {
        console.log("Got Lifters:"+liftersResult.length)
        fs.lifters = liftersResult;
        FormEditState.restoreSavedLifter();
    },function(error) {
        console.log("error"+error)
 
    } );



    var deleteLifter = function(lifter){
        var logThemOut = false;
        if(fs.loggedInUser!=undefined && fs.loggedInUser._id==lifter._id){
                //if we are about to delete the logged in user, we should log them out
                logThemOut = true;
        }

        lifter.remove().then(function(){
            fs.lifters = _.filter(fs.lifters, function(lifter){return lifter._id != fs.lifter._id;});
            console.log('lifter removed')
            fs.toast('Lifter deleted');
            FormState.lifter = {};
            if(logThemOut){fs.loggedInUser = undefined;}

            if(!!fs.loggedInUser){
                //lets set the lifter to the current logged in user
                FormEditState.setLifterByID(fs.loggedInUser._id);
            }
        },function(error){
            fs.toast('Error deleting lifter');
            console.log('error deleting lift',error);
        });
        
    }


    //this is the private update lifter function
    var updateLifter = function(lifter, updates){
        _.each(updates,function(v,k){
            lifter[k] = v;
        });

        lifter.put().then(function(){
            console.log('lifter updated');
            fs.toast('Lifter updated');
        },function(){
            console.log('error updating lifter');
        });
    };


    var service = {};

   

    //uploads a new lifter
    service.createLifter = function(lifter){
        //lets make sure some values work
        if(!parseFloat(lifter.weight)){lifter.weight=0;}
        if(!parseFloat(lifter.height)){lifter.height=0;}


        liftersBase.post(lifter).then(function(lifter){
                fs.lifters.push(lifter);
                fs.lifter = lifter;
                console.log('created lifter:'+JSON.stringify(lifter))
                fs.toast('Lifter created, please calibrate heights now.');

                //if we just made a user that matches the current fb user, we should log them in
                if(lifter.facebookID == fs.facebookID){
                    fs.loggedInUser = lifter;
                }

            },function(error){
                fs.toast('Lifter not created');
                console.log('error creating lifter:'+error)
        });
    }

    service.deleteLifter = function(lifter){
        if(lifter == undefined){
            lifter = fs.lifter;
        }
        console.log('deleting lifter')
        console.log(lifter)

        //now check to see if that lift belongs to the current logged in user
        if(FormEditState.editAllowed(lifter)){
            deleteLifter(lifter);
        }
        else{
            fs.toast('Deleting lifter not allowed, insufficient privilege');
            console.log('can not delete that lifter, it isnt yours');
        }
    }
    

    service.updateLifter = function(lifter, updates){
        console.log('updating lifter');
        if(lifter==undefined){
            if(!fs.lifter){return false;}
            lifter = fs.lifter;
        }
        if(updates==undefined){
            updates = {};
        }

        //now check to see if that lift belongs to the current logged in user
        if(FormEditState.editAllowed(lifter)){
            updateLifter(updates, lifter);
            return true;
        }
        else{
            fs.toast('Edit not allowed, insufficient privilege');
            console.log('can not edit that lifter, it isnt yours');
            return false;
        }
    }

    service.debouncedUpdate = _.debounce(service.updateLifter, 500);
    
    //update maxes for lifter
    $rootScope.$on('maxChanged',function(event, data){
         console.log('max changed')
         service.debouncedUpdate();
    });


    //removes all the local changes to the lifter
    service.restoreLifter = function(lifter){
        if(lifter==undefined){
            if(!fs.lifter){return;}
            lifter = fs.lifter;
        }

        fs.lifter.get().then(function(lifter) {
            // Getting the lifter to discard the changes
            fs.lifter = lifter;
            //console.log('re-got lifter!')
        });
    }





//    fs.calibHeights = [];
//    fs.calibPositions = ["ground-narrow","hang-narrow","rack-narrow","squat-rack-narrow","oh-narrow","ground-narrow"];
//    fs.calibPositions2 = ["bench-up","bench-down","bench-up","bench-down"];

    service.heightCalib = function(idx,dur){
        //This means we have calibration data we need to save
        fs.calibHeights[idx] = FormGlobals.myAverage(fs.elevRaw.wSlice(fs.elevCount-dur*50,fs.elevCount)).mean;
        return fs.calibHeights[idx];
    }
    

    service.calcHeightCalib = function(calibType){
        console.log('calculating:'+calibType)
        console.log(JSON.stringify(fs.calibHeights))
        //put in blank calib heights if the user doesn't have them
        if(!_.has(fs.lifter,'calibHeights')){fs.lifter.calibHeights = {};}
        console.log(JSON.stringify(fs.lifter.calibHeights));
        //this is where we do the calculations to the height calibrations
        var calibPositions = calibType=='oly' ? fs.olyCalibPositions : fs.benchCalibPositions;
        var posLen = calibPositions.length;

        if(calibType=='oly'){
            var ground = fs.calibHeights[0];
            //delta is our assumed drift per position
            var delta = (fs.calibHeights[posLen-1]-ground)/(posLen-1);
            //take each position except the start and last. 
            _.each(calibPositions.slice(1,posLen-1),function(cname,idx){
                fs.lifter.calibHeights[cname] = fs.calibHeights[idx+1] - ground - (idx+1)*delta;
            },this);
        }else if(calibType=='bench'){
            //find height of extended arms
            var upHeight = (fs.calibHeights[0]+fs.calibHeights[2])/2;
            var downHeight = (fs.calibHeights[1]+fs.calibHeights[3])/2;
            fs.lifter.calibHeights['bench-down'] = downHeight-upHeight;
        }
        console.log(JSON.stringify(fs.lifter.calibHeights));
        
    }

    return service;
}]);

