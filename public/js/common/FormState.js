//This is for all the configuration we need
var app = angular.module("twc");



//FormState should be all the state variables we will care about
//Anything that is used around app should be here
//There will be other factories that will manipulate this data
app.factory('FormState', ['$state','$timeout','FormGlobals',
                function($state,$timeout,FormGlobals) {
    //up here are private variables
    var dt = new Date();
    var heightDefaults = {'hang-narrow': 0.582, 'rack-narrow': 1.242, 'oh-narrow': 1.855, 'squat-rack-narrow': 0.654, 'bench-down': -0.449};
    var maxesDefaults =  _.object( _.map(FormGlobals.liftTypes,function(lt){return [ lt.id,155];}) );

    var service =  {

        lifts : [],  //This is the liftTypeID of the current lift
        lifters : [],
        selectedLift : 0,
        liveMetrics : {},
        liftMetrics : [],

        liftType : FormGlobals.liftTypes[2], //This is the whole lift type object

        //weight stuff
        weight : 95, //in lbs, this is the current weight
        weightRange : [35,175],  
        setWeightMax : false,

        maxesDefaults:maxesDefaults,
        maxes : _.object( _.map(FormGlobals.liftTypes,function(lt){return [ lt.id,155];}) ),

        //maxes : _.map(FormGlobals.liftTypes,function(i){return 155;}),
        
        //current lifter
        lifterAction : 'add',
        lifter : {}, //This is the lifterID of the current lifter


        //facebook 
        facebookID : "",
        facebookUserInfo : undefined,
        facebookLoginInfo : undefined,
        facebookFriends : undefined,
        loggedInUser : undefined,

        //vision 
        visionMac : '',
        visionData : '',
        visionPositions : {'left':[],'right':[]},

        

        //dealing with dates and calendar 
        
        today : [dt.getFullYear(),dt.getMonth(),dt.getDate()],
        selectedDay : [dt.getFullYear(),dt.getMonth(),dt.getDate()],
        daysWithLifts : [],



        settingHeight : false,


        //display for userBanner
        liftingState : {'main':'loading',
                             'secondary': 'please wait',
                             'color':'orange'},   //green,yellow,red
        //all of this controls the state of the app
        onBar : true,
        foundCollar : false,
        connectedToCollar : false,
        lastDataTime : 0,
        dataFlowing : false,
        paused : false,
        manualCapturing : false,
        reviewMode : false,

        updateAvaliable : undefined,

        collarMac : 'na',
        correctingElevcorrectingElev : false,
        dataCollectionState : 'pause', //play or pause

        //hist for elevation
        histData : [0,2,2,3,4,5,4,6,8,9,8,9,6,5,6,4,3,2,1,1,0],
        bins : [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,-0,-1,2,3,4,5,6,7,8,9,10],
        collectHistData : false,
        histBaseline : 0,

        //hist for accel
        histDataAccel : [0,2,2,3,4,5,4,6,8,9,8,9,6,5,6,4,3,2,1,1,0],
        binsAccel : _.range(-2.5,2.75,.25),
        histBaselineAccel : 0,

        plotMode : 'lifts', //lifts, session, live
        showLifterPanel : false,
        showWeightPanel : false,
        showBTPanel : false,
        showLiftHistory : false,
        BTConnected : false,
        BTMac : '',

        liftIconIdx : 0,
        liftIcons : ['minus','ground-narrow','hang-narrow','rack-narrow','oh-narrow'],

        animateDirection: '',

        //Battery variables
        batteryRange : 0,
        batteryLevel : 'na',


        //live data variables
        velocity : 0,
        accelCount : 0,
        accelRaw : _.range(0,1600,0),  //mag
        elevCount : 0,
        elevOffset : 0,
        elevRaw : _.range(0,400,0),  //height

        visionRaw : _.map(_.range(400),function(i){return [1,1,1];}), //x,y,z
        lastVisionTime : 0,

        vh: (640/100),  //this is default to galaxy s5

        captureData : true,
        capturedData : [[],[],[]],

        calibHeights : [],
        olyCalibPositions : ["ground-narrow","hang-narrow","rack-narrow","squat-rack-narrow","oh-narrow","ground-narrow"],
        benchCalibPositions : ["bench-up","bench-down","bench-up","bench-down"],


        heightDefaults : heightDefaults,
        heights : _.extend({},  heightDefaults),
        LDO : undefined,
        LDOs: FormGlobals.LDOs,

        lastDist : 0,
        liftProgress :0, 
        lastLiftEvent:0,
        postLiftWait : 0,


        //variables to use with metrics
        metricEdit : undefined,

        //plot options
        plotType : 'lift plot',
        plotTypeOpts : ['live plot','lift plot','session plot'],

        //these are used for defaults for the session and live metrics
        

        //this has id's of metric locations
        //each of those objects have id's of lift type ids
        //we will first check here for which metric to show, 
        //if nothing is here we will check the lift type object
        metricsDisplay : {
                    'default':['sessionTime','totalWork','numOfLifts'],
                    'session':['','','']
        },
        

        //this will keep track of metric ranges, colors, and anything else we 
        //will need to customize about different metrics we display
        //There will be metrics objects in this array that will just overwrite the default options
        userMetrics : {},


        options : {
            'weightUnits':{'name':'weight units','txt':['lbs','kg'],'default':1,'selected':1},
            'quickWeightChange':{'name':'quick weight change','txt':['on','off'],'default':1,'selected':1},
            'simpleMetrics':{'name':'simple metrics','txt':['on','off'],'default':0,'selected':0},
            'liftingFromRack':{'name':'lifting from rack','txt':['yes','no'],'default':0,'selected':0},
            'lastLift':{'name':'last lift','txt':['on','off'],'default':1,'selected':1},

            'vibrate':{'name':'vibrate','txt':['on','off'],'default':1,'selected':1},


            'showLiftPhases':{'name':'show lift phases','txt':['on','off'],'default':0,'selected':0},
            'playSoundForLift':{'name':'play sounds for lift','txt':['on','off'],'default':1,'selected':1},

            'noiseSuccess':{'name':'Play sound on success','txt':['on','off'],'default':1,'selected':1},
            'noiseFail':{'name':'Play sound on Fail','txt':['on','off'],'default':1,'selected':1},
        },


        //this takes a weight in lbs and returns the primary weight
        

        //Navigation stuff



        


    }

    service.optionOn = function(optionName){
        if(_.has(service.options,optionName) && service.options[optionName].selected==1){
            return true;
        }
        return false;
    }

    service.calcWeight = function(lbs){
        if(lbs==undefined){return 0;}
        if(service.optionOn('weightUnits')){
            return (lbs);
        }else{
            return (lbs*0.45359237);
        }
    };

    //this takes a primary weight and convert it to pounds
    service.unCalcWeight = function(weight){
        if(weight==undefined){return 0;}
        if(service.options.weightUnits.selected==0){
            return (weight/0.45359237);
        }else{
            return (weight);
        }
    };

    //this takes a primary weight and convert it to pounds
    service.vibrate = function(){
        if(service.options.vibrate.selected==1){
            navigator.vibrate(50);
        }
    };

    service.navTo = function(dest){
        console.log('nav to:',dest)
        //stop any lifting progress
        service.liftProgress =0;
        service.vibrate();
        $state.go(dest);
    };

    service.toast = function(msg){
        console.log('toast me')
    };

    service.lift = function(){
        return service.lifts[service.selectedLift];
    }

    service.getLifterByID = function(lifterID){
        return  _.findWhere(service.lifters, {_id: lifterID})
    }


    return service;

}]);








   


//keytool -exportcert -alias alias_name -keystore my-release-key.keystore| openssl sha1 -binary | openssl base64









/*

 


    this.saveOptions = function(){
        FormLocal.saveUserOptions(this.options);
    }

    

    this.textEdit = function(show){
        if(show){
            $rootScope.$broadcast('showPicture');
        }else{
            $rootScope.$broadcast('hidePicture');
        }
    }


        //Navigation stuff
    this.goAdmin = function(){
        //console.log('go home')
        navigator.vibrate(50);
        this.animateDirection = 'slide-up';
        $timeout(function(){
            $location.path('/admin');
        });
    };





*/