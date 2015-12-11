//This is for all the configuration we need
var app = angular.module("twc");

//FormEditState is what we use to do most of the edits to form state. 
//Does things like changing weights, lift types, lifters. 
app.factory('FormEditState', ['$rootScope','FormGlobals','FormState',
                function($rootScope, FormGlobals,FormState) {
    var fs = FormState;

    var service = {};

    
    $rootScope.$on('heartbeat',function(event, data){
        //console.log('beat');
        
        $rootScope.$broadcast('newData',_.uniq(_.map(_.range(7),function(i){return _.random(10);})));

    });



    

    

    service.setLiftingDay = function(year,month,day){
        //console.log(year+":"+month+":"+day)
        if(year==undefined){
            //no data means we set lifting day to today
            fs.selectedDay = _.map(fs.today,function(i){return i;});
        }else{
            fs.selectedDay = [year,month,day];
        }
        fs.reviewMode = !_.isEqual(fs.selectedDay,fs.today);
        
        //when this happens we should get rid of any old data

        
        $rootScope.$broadcast('newLiftingDay', 
                  {lifter:fs.lifter,
                    year:fs.selectedDay[0],
                    month:fs.selectedDay[1],
                    day:fs.selectedDay[2]  });
        

    };





    //sets the selected lift, then broadcasts it to everyone
    service.setSelectedLift = function(idx){
        if(idx!=undefined){
            fs.selectedLift = idx;
        }
        if(!!fs.lifts[fs.selectedLift]){
            $rootScope.$broadcast('newLiftSelected', 
                  {lift:fs.lifts[fs.selectedLift],
                    liveMetrics:fs.liveMetrics,
                    liftMetrics:fs.liftMetrics,
                    selectedLift:fs.selectedLift  });
        }
        
    };

    service.setSelectedLiftByID = function(id){
        var idx = _.findIndex(fs.lifts, { '_id': id });
        if(idx>-1){
            service.setSelectedLift(idx);
        }
    }

    //increments the selected lift
    service.incrementSelectedLift = function(idx){
        if(fs.lifts.length==0){return;}
        if(idx!=undefined){
            fs.selectedLift+=idx;
            if(fs.selectedLift<0){fs.selectedLift=fs.lifts.length-1;}
            if(fs.selectedLift>=fs.lifts.length){fs.selectedLift=0;}
            service.setSelectedLift(fs.selectedLift);
        }
    };

    service.changeWeightUnits = function(num){
        console.log(fs.options.weightUnits)
        if(num==undefined){
            //just toggle the weight
            fs.options.weightUnits.selected = (fs.options.weightUnits.selected+1)%2;
        }else{
            fs.options.weightUnits.selected = num;
        }
        service.setWeight(0.00001);
    };

    service.toggleSetMax = function(){
        //This gets called when we want to set a max weight
        fs.setWeightMax = !fs.setWeightMax;
        service.setWeight(0);
    };
    service.setWeight = function(num,reset){
        if(reset==true){fs.weight=0;}
        var wMult = 1;
        //checking if we are in pounds or kgs
        if(fs.options.weightUnits.selected==1){num = num;}
        else{num = num*2.2046;wMult = 1/2.2046;}
        

        if(!fs.setWeightMax){
            fs.weight += num;
            //here we make sure it doesn't go past the slider
            //by looking at our weight maxes for the current lift type
            var maxRange = parseInt(1.2*fs.maxes[fs.liftType.id+'']);
            if(fs.weight>maxRange){fs.weight=maxRange;}
            if(fs.weight<fs.weightRange[0]){fs.weight=fs.weightRange[0];}
            
            $rootScope.$broadcast('weightChanged',
                {weight:fs.weight,
                    wMult:wMult,
                    max:maxRange,
                    '100pct':fs.maxes[fs.liftType.id+''],
                    weightRange:[35,maxRange]}
            );
        }else{
            //this is if we are setting maxes
            fs.maxes[fs.liftType.id+''] += num;
            if(!_.has(fs.lifter,'maxes')){fs.lifter.maxes={};}
            fs.lifter.maxes[fs.liftType.id+''] += num;

            $rootScope.$broadcast('maxChanged',
                {max:fs.maxes[fs.liftType.id+''],
                    liftType: fs.liftType,
                    wMult:wMult,weightRange:[100,700]}
            );
        }
    };

    service.setLiftType = function(liftType){
        if(!liftType){return;}
        fs.liftType = liftType;
        //now, set the right LDO for that lift type
        fs.LDO = _.find(FormGlobals.LDOs,function(ldo){
            return _.contains(ldo.liftTypes,liftType.id);
        });
        if(fs.LDO==undefined){
            fs.LDO = _.find(fs.LDOs,function(ldo){
                return _.contains(ldo.liftTypes,liftType.parent);
            });
        }
        //console.log(JSON.stringify(fs.LDO))
        //!!fs.setMetrics([0,1,2]);
        fs.liftProgress = 0;
        //console.log(JSON.stringify(fs.LDO));

        $rootScope.$broadcast('liftTypeChanged',{liftType:liftType});

    };

    service.setLiftTypeByID = function(liftTypeID){
        service.setLiftType( _.findWhere(FormGlobals.liftTypes, {id: lifterID}) );
    };



    service.getLiftingDays = function(lifter){
        //let's sort through their lifts
        fs.daysWithLifts = [];  //[year,month,day,#lifts]this is an array we can pass to the calendar
        var done = false;
        var dt;
        _.each(lifter.lifts,function(lift){
            done = false;
            dt = new Date(lift[1]);
            _.each(fs.daysWithLifts,function(d,idx){
                if(dt.getFullYear()==d[0] && dt.getMonth()==d[1] && dt.getDate()==d[2]){
                    fs.daysWithLifts[idx][3]++;
                    done = true;
                }
            });
            if(!done){
                //add it to the list
                fs.daysWithLifts.push([dt.getFullYear(),dt.getMonth(),dt.getDate(),1]);
            }
        });
    }

    var restoreLifterID,restoreFacebookID;

    //This is so we can wait until the lifter list is loaded to decide which lifter set
    //Takes info from local storage, and facebook login
    service.restoreSavedLifter = function(lifterID,facebookID){
        if(lifterID!=undefined){
            restoreLifterID = lifterID;
        }
        if(facebookID!=undefined){
            restoreFacebookID = facebookID;
        }
        if(fs.lifters.length > 0){
            //first, let's check the facebook ID
            if(restoreFacebookID!=undefined){
                //look through all the users and set the one who is logged into facebook
                var lifter = _.findWhere(fs.lifters, {facebookID: restoreFacebookID});
                
                if(lifter!=undefined){
                    console.log('found lifter by ID')
                    //console.log(JSON.stringify(lifter));
                    service.setLifter(lifter);
                    lifter.facebookPic = fs.facebookPicture;
                        lifter.put().then(function(lifter) {
                            console.log('updated lifter with facebook Picture!')
                        });

                    fs.loggedInUser = lifter;
                }else{
                    console.log('no lifter found with FB ID')
                    //now, check by name
                    lifter = _.findWhere(fs.lifters, {name: (''+fs.facebookUserInfo.name).toLowerCase()});
                    if(lifter!=undefined){
                        console.log('found lifter by name')
                        //console.log(JSON.stringify(lifter));
                        service.setLifter(lifter);
                        fs.loggedInUser = lifter;
                        
                        //updating the lifter with the correct facebook ID
                        lifter.facebookID = restoreFacebookID;
                        lifter.facebookPic = fs.facebookPicture;
                        lifter.put().then(function(lifter) {
                            console.log('updated lifter with facebook ID!')
                        });
                    }else{
                        console.log('no lifter found with FB name')
                        //Now, let's take them to the login page to make a user
                        service.addLifter();
                    }
                }
            }
            else if(restoreLifterID){
                service.setLifterByID(restoreLifterID);
            }
            
        }
    }

    service.addLifter = function(){
        console.log('adding lifter');

        var lastLifterID = fs.lifter._id;

        fs.lifter = {
                    name: "",
                    weight:"",
                    height:"",
                    createUserID: lastLifterID,
                    cTime: (new Date()).getTime(),
                };
        //if we are already logged in, we are trying to create a new user
        if(fs.loggedInUser!=undefined){
            fs.lifter.createUserID =  fs.loggedInUser._id;
        }else{
            //if we aren't logged in, we want to use any facebook data
            if(_.has(fs.facebookUserInfo,'id')){
                fs.lifter.facebookID =  fs.facebookUserInfo.id;
            }
            if(_.has(fs.facebookUserInfo,'name')){
                fs.lifter.name =  fs.facebookUserInfo.name;
            }
            if(_.has(fs.facebookUserInfo,'email')){
                fs.lifter.email =  fs.facebookUserInfo.email;
            }
        }

        //console.log(JSON.stringify(fs.lifter))
        fs.lifterAction = 'add';

        fs.navTo('editLifter');
        //fs.animateDirection = 'slide-right';
     
    };


    service.editAllowed = function(item){
        return true;
         //console.log(JSON.stringify(this.loggedInUser));
        // console.log(item);
        if(item==undefined){return false;}
        if(fs.loggedInUser==undefined){return false;}

        if(_.has(item,'lifterID')){
            //fs is a lift
            if(fs.loggedInUser._id==item.lifterID || fs.loggedInUser._id==item.createUserID){
                return true;
            }
        }else{
            //fs is a lifter
            if(fs.loggedInUser._id==item._id || fs.loggedInUser._id==item.createUserID){
                return true;
            }
        }
        return false;
    }



    service.setLifter = function(lifter){
        //console.log(lifter)

        fs.lifts = [];


        if(lifter==undefined){
            fs.lifter = {};
            fs.daysWithLifts = [];
        }else{
            fs.lifter = lifter;
            //set lifting heights

            //console.log('maxes',fs.maxes);

            fs.startTime = (new Date()).getTime() - 7* 60*60*24*1000;
            fs.endTime = (new Date()).getTime();

            service.getLiftingDays(lifter);
            //console.log(daysWithLifts);
            //service.setLiftingDay();
        }
        //console.log('set lifter:',fs.lifter.name)

        $rootScope.$broadcast('loadLifts', 
                  {lifter:fs.lifter,
                   start:fs.startTime,
                   end:fs.endTime
        });
    };


    service.setLifterByID = function(lifterID){
        var lifter = _.findWhere(fs.lifters, {_id: lifterID})
        if(lifter!=undefined){
            service.setLifter(lifter);
        }
    };




    return service;


    
}]);

