//This is for all the configuration we need
var app = angular.module("twc");

//FormMetrics has all of the methods that will deal with metrics
app.factory('FormLifts', ['$rootScope','Restangular','FormGlobals', 'FormState','FormEditState' ,'FormAnalysis','FormMetrics',
            function($rootScope, Restangular, FormGlobals, FormState,FormEditState,FormAnalysis,FormMetrics) {
    var fs = FormState;


    //this is the private delete lift function
    var deleteLift = function(lift){
        fs.toast('Lift Deleted');
        lift.remove().then(function(){
            fs.lifts = _.filter(fs.lifts, function(l){return l._id != lift._id;});
            //!!FormEditState.updateSessionMetrics();
            FormEditState.incrementSelectedLift(0);
        },function(){
            console.log('error deleting lift');
        });
        
    }

    //this is the private update lift function
    var updateLift = function(lift, updates){
        _.each(updates,function(v,k){
            lift[k] = v;
        });

        //if we updated weight, we should recalculate
        if(_.has(updates,'weight')){
            var liftData = FormAnalysis.analyzeLift(lift);
            lift = FormAnalysis.doAnalysis(lift,liftData);
        }

        lift.put().then(function(lift){
            fs.toast('Lift Updated');
            console.log('lift updated');
        },function(){
            console.log('error updating lift');
        });
    };

    //this is the private create lift
    var createLift = function(lifter,lift){
        var liftData = FormAnalysis.analyzeLift(lift);
        lift = FormAnalysis.doAnalysis(lift,liftData);
        
        fs.lifts.push(lift);
        FormEditState.setSelectedLift(fs.lifts.length-1);

        $rootScope.$broadcast('liftAnalyzed',{lift:lift});

        lifter.post('lifts',lift).then(function(lift){
            //console.log(JSON.stringify(lift));
            fs.lifts[fs.lifts.length-1] = lift;
            console.log("we have this many lifts now:"+fs.lifts.length)

        },function(){
            console.log('error in the create lift post');
        });


        
        //now, lets play a sound
        //first, we need to figure out which sound to play
        var mainMetric = FormMetrics.getMetricForIdx(0);
        var val = FormGlobals.fixMetricUnits( lift.metrics[mainMetric.key],mainMetric,lift.weight)[0];
        
        var rangeIdx = FormGlobals.getMetricRange(val,mainMetric);
        if(!!rangeIdx){
            $rootScope.$emit('playSound',{soundName:mainMetric.sounds[rangeIdx]});
        }
    }



    var service = {};

    service.loadLiftsByTime = function(lifter,start,end){
        console.log('start:'+start+' end:'+end);
        // GET /lifters/123/lifts?query=params
        lifter.getList("lifts", {'startTime': start,'endTime':end}).then(
            function(lifts) {
                console.log('got lifts:'+lifts.length)
                //console.log(lifts)
                fs.lifts = _.sortBy(lifts,'cTime');
                //console.log('got this many lifts:'+fs.lifts.length)
                //!!self.updateLiveMetrics();
                //!!self.updateSessionMetrics();
                FormEditState.setSelectedLift(0);
            }, function errorCallback() {
                console.log("Oops error from server :(");
            }
        )

    };

    service.loadLifts = function(lifter,year,month,day){
        if(lifter==undefined || year==undefined || month==undefined || day==undefined){
            return;
        }
        var start = new Date(year,month,day).getTime();
        //service.loadLiftsByTime(lifter,start)
    }



    $rootScope.$on('newLiftingDay', function (event, data) {
        service.loadLifts(data.lifter,data.year,data.month,data.day);
    });

    $rootScope.$on('loadLifts', function (event, data) {
        service.loadLiftsByTime(data.lifter,data.start,data.end);
    });


    service.getSelectedLift = function(){
      return fs.lifts[fs.selectedLift];
    }

    service.loadLift = function(liftIdx){
        lift=fs.lifts[liftIdx];
        if(fs.lifts[liftIdx].acceleration == undefined){
            fs.lifts[liftIdx].get().then(function(newLift){
                //Little fix for lifts that don't have liftName
                console.log('got lift',newLift)
                if(!_.has(newLift,'liftName')){
                    newLift['liftName']= FormGlobals.liftTypeByID(newLift.liftType).name;
                }
                //console.log('got lift',newLift)
                fs.lifts[liftIdx] = newLift;
                FormEditState.setSelectedLift(liftIdx);
            });
        }
    }

    service.loadLift2 = function(lift){
        if(lift.acceleration == undefined){
            lift.get().then(function(newLift){
                //Little fix for lifts that don't have liftName
                if(!_.has(newLift,'liftName')){
                    newLift['liftName']= FormGlobals.liftTypeByID(newLift.liftType).name;
                }
                console.log('got lift',newLift)
                //now, find that lift and replace it

                var idx = _.findIndex(fs.lifts, function(l) {
                    return l._id == newLift._id;
                });
                newLift.checked = true;
                if(idx>=0){
                    fs.lifts[idx] = newLift;
                }else{
                    fs.lifts.push(newLift);
                }
            });
        }
    }

    $rootScope.$on('newLiftSelected', function (event, data) {
        service.loadLift(data.selectedLift);
    });

    $rootScope.$on('loadLift', function (event, data) {
        console.log('loading lift')
        service.loadLift2(data.lift);
    });

    service.createLift = function(){
        
        //console.log('creating lift')
        //this will create a lift and upload it
        var lift = {
            cTime:(new Date()).getTime(),
            hardwareVer : 'v1',   //version of hardware
            collarMac : fs.collarMac,         //MAC of collar to collect lift
            liftName : fs.liftType.name,          //name of the lift type
            liftType : fs.liftType.id,          //int of liftTypeID,subliftindex
            weight : fs.weight,            //weight in lbs
            score : 5,
            acceleration: _.map(fs.capturedData[0],function(d,idx){return [.005*idx,d]}),   //converting to m/s2
            altitude: _.map(fs.capturedData[1],function(d,idx){return [.02*idx,d]}),  //converting to m
            vision: _.map(fs.capturedData[2],function(d,idx){return [.02*idx,d[0],d[1],d[2]]}),  //converting to m
            metrics:{weight:fs.weight}
        }

        if(fs.loggedInUser!=undefined){
            lift.createUserID =  fs.loggedInUser._id;
        }

        console.log(lift);
        createLift(fs.lifter,lift);
    }


    $rootScope.$on('createLift', function (event, data) {
        service.createLift();
    });
/*
    //watch for event that we have a new lift
    $rootScope.$on('liftAnalyzed', function (event, data) {
        var lift = data.lift;
        //First, get the metric
        var keyMetric = self.getMetricForIdx(0);
        console.log('key Metric:'+JSON.stringify(keyMetric))
        if(_.has(lift.metrics,keyMetric.key) && _.has(keyMetric,'ranges') && _.has(keyMetric,'sounds')){
            var val = lift.metrics[keyMetric.key];
            //now, figure out which range it is in
            var i = 2;
            if(val<keyMetric.ranges[1]){
                i=0;
            }else if(val<=keyMetric.ranges[2]){
                i=1;
            }
            self.playSound(keyMetric.sounds[i]);
        }
    });
*/
    service.deleteLift = function(lift){
        if(lift == undefined){
            lift = fs.lifts[fs.selectedLift];
        }
        console.log('deleting lift')
        console.log(lift)

        //now check to see if that lift belongs to the current logged in user
        if(FormEditState.editAllowed(lift)){
            deleteLift(lift);
        }
        else{
            fs.toast('Delete not allowed, insufficient privilege');
            console.log('can not delete that lift, it isnt yours');
        }
    }

    service.updateLift = function(updates, lift){
        if(lift==undefined){
            lift = fs.lifts[fs.selectedLift];
        }
        if(updates==undefined){
            updates = {};
        }

        //now check to see if that lift belongs to the current logged in user
        if(FormEditState.editAllowed(lift)){
            updateLift(lift,updates);
        }
        else{
            fs.toast('Edit not allowed, insufficient privilege');
            console.log('can not edit that lift, it isnt yours');
        }
    }

    service.getLiftByID = function(liftID){
        if(!liftID){return;}

        Restangular.one('lifts', liftID).get().then(function(newLift){
            //Little fix for lifts that don't have liftName
            console.log('got lift',newLift)
            //now, find that lift and replace it
            fs.lifts.push(newLift);
            
        });
        
    }

    service.getLifts = function(){
        Restangular.all('lifts').getList().then(function(lifts){
            //Little fix for lifts that don't have liftName
            console.log('got lifts:',lifts.length)
            //now, find that lift and replace it
            fs.lifts=lifts;
            
        });
        
    }

    return service;
}]);

