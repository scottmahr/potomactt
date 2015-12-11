//This is for all the configuration we need
var app = angular.module("twc");

//FormGlobals set up all the constants that we need
app.factory('FormGlobals', [function() {

    var service = {};
    
    //Here are all the lift types that we have right now. 
    service.liftTypes = [
        {
        "id":1,
        "name":"Clean",
        "positions":["ground-narrow","rack-narrow"],
        "defaultMetrics":["hipDrive","",""]
        },
        {
        "id":11,
        "name":"Power Clean",
        "positions":["ground-narrow","rack-narrow"],
        "parent":1
        },
        {
        "id":12,
        "name":"Squat Clean",
        "positions":["ground-narrow","squat-rack-narrow","rack-narrow"],
        "parent":1
        },
        {
        "id":13,
        "name":"Hang Clean",
        "positions":["hang-narrow","rack-narrow"],
        "parent":1
        },
        {
        "id":2,
        "name":"Snatch",
        "positions":["ground-wide","oh-wide"],
        "defaultMetrics":["hipDrive","",""]
        },
        {
        "id":21,
        "name":"Power Snatch",
        "positions":["ground-wide","oh-wide"],
        "parent":2
        },
        {
        "id":22,
        "name":"Squat Snatch",
        "positions":["ground-wide","squat-oh-wide","oh-wide"],
        "parent":2
        },      
        {
        "id":23,
        "name":"Hang Snatch",
        "positions":["hang-wide","oh-wide"],
        "parent":2
        },      
        {
        "id":3,
        "name":"Deadlift",
        "positions":["ground-narrow","hang-narrow"],
        "defaultMetrics":["deadliftMaxPull","",""]
        },
        {
        "id":4,
        "name":"Clean & Jerk",
        "positions":["ground-narrow","rack-narrow","oh-narrow"],
        "defaultMetrics":["hipDriveVal","",""]
        },
        {
        "id":5,
        "name":"Squat",
        "positions":["rack-narrow","squat-rack-narrow","rack-narrow"],
        "defaultMetrics":["maxVel","",""]
        },
        {
        "id":51,
        "name":"Front Squat",
        "positions":["rack-narrow","squat-rack-narrow","rack-narrow"],
        "parent":5
        },
        {
        "id":52,
        "name":"Back Squat",
        "positions":["rack-narrow","squat-rack-narrow","rack-narrow"],
        "parent":5
        },
        {
        "id":53,
        "name":"OH Squat",
        "positions":["oh-wide","squat-oh-wide","oh-wide"],
        "parent":5
        },
        {
        "id":6,
        "name":"Overhead",
        "positions":["rack-narrow","oh-narrow"],
        "defaultMetrics":["jerkPushVal","",""]
        },
        {
        "id":61,
        "name":"Push Press",
        "positions":["rack-narrow","oh-narrow"],
        "parent":6
        },
        {
        "id":62,
        "name":"Push Jerk",
        "positions":["rack-narrow","oh-narrow"],
        "parent":6
        },
        {
        "id":7,
        "name":"Thruster",
        "positions":["rack-narrow","squat-rack-narrow","oh-narrow"],
        "defaultMetrics":["jerkPushVal","",""]
        },
        {
        "id":10,
        "name":"Bench Press",
        "positions":["bench-down","bench-up"],
        "defaultMetrics":["jerkPushVal","",""]
        },
        {
        "id":0,
        "name":"Dev",
        "positions":[],
        "defaultMetrics":["jumpForce","",""]
        },
              {
        "id":91,
        "name":"Auto",
        "positions":[],
        "parent": 0
        },
        {
        "id":92,
        "name":"Manual",
        "positions":[],
        "parent": 0
        },
        {
        "id":93,
        "name":"Vertical",
        "positions":[],
        "defaultMetrics":["jumpForce","",""],
        "parent": 0
        },
        {
        "id":94,
        "name":"Vert (Man)",
        "positions":[],
        "parent": 0
        },
        {
        "id":99,
        "parent":-1,
        "name":"NA",
        "positions":[],
        }
    ];
    //A list of all the metrics we keep track of
    //name: [lifttypes(str),Print name,description,units,if they are simple or not]

    service.LDOs = [
                {
                    'liftTypes':[1],  //cleans
                    'timeout':8,    //timeout in seconds
                    'minTime':2.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'elev-lt-abs':.15
                        },
                        {
                            'start':1,
                            'end':2,
                            'elev-gt':'hang-narrow',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':3,
                            'elev-gt':'rack-narrow-.3',
                        },
                        {
                            'start':3,
                            'end':10,
                            'elev-lt':.25,
                            'postLiftWait':1.5,
                        },
                    ]
                },{
                    'liftTypes':[13],  //hang cleans
                    'timeout':6,    //timeout in seconds
                    'minTime':2.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'elev-lt':'hang-narrow+.2',
                            'elev-gt':'hang-narrow-.2'
                        },
                        {
                            'start':1,
                            'end':2,
                            'elev-gt':'rack-narrow-.2',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':10,
                            'elev-lt':'hang-narrow+.2',
                            'postLiftWait':1.5,
                        },
                    ]
                },{
                    'liftTypes':[2,4],   //ground to overhead (snnatch, c&j)
                    'timeout':15,    //timeout in seconds
                    'minTime':3.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'elev-lt-abs':.15
                        },
                        {
                            'start':1,
                            'end':2,
                            'elev-gt':'hang-narrow',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':3,
                            'elev-gt':'oh-narrow-.3',
                        },
                        {
                            'start':3,
                            'end':10,
                            'elev-lt':.25,
                            'postLiftWait':.5,
                        },
                    ]
                },{
                    'liftTypes':[7],   //thruster
                    'timeout':8,    //timeout in seconds
                    'minTime':3,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'elev-gt':'squat-rack-narrow-.15',  
                            'elev-lt':'squat-rack-narrow+.15',
                        },
                        {
                            'start':1,
                            'end':2,
                            'elev-gt':'oh-narrow-.3',
                            'startLift':2
                        },
                        {
                            'start':2,
                            'end':10,
                            'elev-lt':'rack-narrow+.15',
                            'postLiftWait':1,
                        },
                    ]
                },{
                    'liftTypes':[6],    //overhead stuff
                    'timeout':8,    //timeout in seconds
                    'minTime':1.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'elev-gt':'rack-narrow-.15',  
                            'elev-lt':'rack-narrow+.15',
                        },
                        {
                            'start':1,
                            'end':2,
                            'elev-gt':'oh-narrow-.25',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':10,
                            'elev-lt':'rack-narrow+.15',
                            'postLiftWait':.5,
                        },
                    ]
                },{
                    'liftTypes':[3],    //deadlift stuff
                    'timeout':6,    //timeout in seconds
                    'minTime':1.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'elev-lt-abs':.15
                        },
                        {
                            'start':1,
                            'end':2,
                            'elev-gt':'hang-narrow-.25',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':10,
                            'postLiftWait':.5,
                            'elev-lt':.25,
                        },
                    ]
                },{
                    'liftTypes':[5],  //squat stuff
                    'timeout':6,    //timeout in seconds
                    'minTime':1.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'vel-lt-abs':.2,
                            'startdist':true
                        },
                        {
                            'start':1,
                            'end':2,
                            'dist-lt':'squat-rack-narrow -rack-narrow + .2',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':10,
                            'dist-gt':-.2,
                            'postLiftWait':.5,
                        }
                    ]
                },
                {
                    'liftTypes':[10],  //bench press
                    'timeout':5,    //timeout in seconds
                    'minTime':1.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'vel-lt-abs':.2,
                            'startdist':true
                        },
                        {
                            'start':1,
                            'end':2,
                            'dist-lt':'bench-down + .15',
                            'startLift':1.5
                        },
                        {
                            'start':2,
                            'end':10,
                            'dist-gt':-.15,
                            'postLiftWait':.5,
                        }
                    ]
                },
                {
                    'liftTypes':[93],  //vertical jump
                    'timeout':3,    //timeout in seconds
                    'minTime':1.5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'vel-lt-abs':.2,
                        },
                        {
                            'start':1,
                            'end':2,
                            'accel-gt':5,
                            'startLift':.5
                        },
                        {
                            'start':2,
                            'end':3,
                            'accel-lt':-5,
                        },
                        {
                            'start':3,
                            'end':10,
                            'accel-gt':5,
                            'postLiftWait':.5,
                        }
                    ]
                },
                {
                    'liftTypes':[91],  //auto record
                    'timeout':60,    //timeout in seconds
                    'minTime':5,

                    'stages':[
                        {
                            'start':0,
                            'end':1,
                            'vel-lt-abs':.2,
                        },
                        {
                            'start':1,
                            'end':2,
                            'accel-gt':4,
                            'startLift':.5
                        },
                        {
                            'start':2,
                            'end':10,
                            'atRest':10,
                            'postLiftWait':.1,
                        }
                    ]
                }
    ];

    service. metricMaster = [

      {"id":1, "key":"baseline","liftTypes":"all", "name":"Baseline","description":"Difference between accel signal and g","units":"lbs"},
      {"id":2, "key":"startTime","liftTypes":"all","name":"Start Time","description":"Start from floor","units":"sec"},
      {"id":3, "key":"duration","liftTypes":"all","name":"Duration","description":"Time of lift","units":"sec"},
      {"id":4, "key":"restTime","liftTypes":"all","name":"Rest Time","units":"sec"},
      {"id":5, "key":"weight","liftTypes":"all","name":"Weight","description":"Weight units","units":"lbs"},
      {"id":6, "key":"videoSync","liftTypes":"all","name":"VideoSync","description":"Time from start of data to staunits","units":"sec"},
      
      {"id":7, "key":"startIdx", "liftTypes":"1,2,3","name":"Start Index","description":"Start from floorunits","units":"index"},
      {"id":8, "key":"floatIdx", "liftTypes":"1,2,4","name":"Float Index","description":"Index of minimum force between hips to shoulders","units":"index"},
      {"id":9, "key":"hasHips", "liftTypes":"1,4,2","name":"Has Hips","description":"Metric to tell if lift has hip drive","units":"index"},
      {"id":10, "key":"hipDriveIdx", "liftTypes":"1,4,2","name":"Hip Drive Index","description":"Index of maximum Hip Drive Force","units":"index"},
      {"id":11, "key":"firstPullIdx", "liftTypes":"1,4,2","name":"First Pull Index","description":"Index of maximum First Pull Force","units":"index"},
      {"id":12, "key":"dipIdx", "liftTypes":"1,4,2","name":"Dip Index","description":"Index of minimum force between knees and hips","units":"index"},
      {"id":13, "key":"catchIdx", "liftTypes":"1,4,2","name":"Catch Index","description":"Index at catch at rack position","units":"index"},
      {"id":14, "key":"dropIdx", "liftTypes":"1,4,2","name":"Drop Index","description":"Around where bar is dropped to ground","units":"index"},

      //general stuff


      {"id":80, "key":"maxVelIdx", "liftTypes":[1,5,10,4,3,2,7],"units":"index"},
      {"id":81, "key":"maxVel", "liftTypes":[1,5,10,4,3,2,7],"name":"Concentric Vel Max","description":"Concentric (up) max Velocity","units":"m/s","simple": true,
            "ranges":[0,1.5,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":91, "key":"minVelIdx", "liftTypes":[5,10],"units":"index"},
      {"id":92, "key":"minVel", "liftTypes":[5,10],"name":"Eccentric Vel Min","description":"Eccentric (down) min velocity","units":"m/s","simple": true,
            "ranges":[-2,-1,-.8,0],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":101, "key":"downUpRatio", "liftTypes":[5,10],"name":"Down Up Ratio","description":"Ratio of down time to up time, higher number is slower up.","units":"ratio","simple": true,
            "ranges":[0,.9,1.1,2],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},


      {"id":105, "key":"avgDownVel", "liftTypes":[5,10],"name":"Eccentric Vel avg","description":"Eccentric (down) average velocity","units":"m/s","simple": true,
            "ranges":[0,1.5,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":106, "key":"avgUpVel", "liftTypes":[5,10],"name":"Concentric Vel avg","description":"Concentric (up) average velocity","units":"m/s","simple": true,
            "ranges":[0,1.5,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      //cleans and snatches
      

      {"id":82, "key":"hipDriveIdx", "liftTypes":[1,4,2],"units":"index"},
      {"id":83, "key":"hipDrive", "liftTypes":[1,4,2],"name":"Max Hip Drive","description":"Maximum Hip Drive Force","units":"m/s2", "simple": true,
            "ranges":[0,50,150,185],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":84, "key":"dropTime", "liftTypes":[1,4,2],"name":"Drop Time","description":"Time from hip drive to catch","units":"sec", "simple": true,
            "ranges":[0,.2,.3,1],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":85, "key":"firstPullIdx", "liftTypes":[1,4,2],"units":"index"},
      {"id":86, "key":"firstPull", "liftTypes":[1,4,2],"name":"Max First Pull","description":"Maximum First Pull Force","units":"m/s2", "simple": true,
            "ranges":[0,50,150,185],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":87, "key":"transition", "liftTypes":[1,4,2],"name":"Value of transition","description":"Min transition force","units":"m/s2"},
      {"id":88, "key":"transitionIdx", "liftTypes":[1,4,2],"units":"index"},
      {"id":103, "key":"firstPullRatio", "liftTypes":[1,4,2],"name":"First Pull Ratio","description":"Ratio of First Pull Force to weight on the bar","units":"%", "simple": true,
            "ranges":[0,1.2,1.5,2],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":104, "key":"hipDriveRatio", "liftTypes":[1,4,2],"name":"Hip Drive Ratio","description":"Ratio of hip drive Force to weight on the bar","units":"%", "simple": true,
            "ranges":[0,1.5,1.8,2],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      //jerk
      {"id":25, "key":"jerkMaxVelIdx", "liftTypes":[4,6],"units":"index"},
      {"id":26, "key":"jerkMaxVel", "liftTypes":[4,6],"name":"Jerk Vel Max","description":"Jerk Concentric (up) max Velocity","units":"m/s","simple": true,
            "ranges":[0,1.5,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":28, "key":"jerkFirstPushIdx", "liftTypes":[4,6],"units":"index"},
      {"id":29, "key":"jerkSecondPushIdx", "liftTypes":[4,6],"units":"index"},
      {"id":32, "key":"jerkFirstPush", "liftTypes":[4,6],"name":"First Push","description":"Maximum of first push for Jerk","units":"m/s2","simple": true,
            "ranges":[0,1.5,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":33, "key":"jerkSecondPush", "liftTypes":[4,6],"name":"Second Push","description":"Maximum of Second push for Jerk","units":"m/s2","simple": true,
            "ranges":[0,1.5,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":23, "key":"secondPushRatio", "liftTypes":[4,6],"name":"second push ratio","description":"Ratio of second push to first push","units":"%", "simple": true,
            "ranges":[0,1.5,1.8,2],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":24, "key":"secondPushTime", "liftTypes":[4,6],"name":"Jerk Drop Time","description":"Time from first push to second push","units":"sec", "simple": true,
            "ranges":[0,.2,.3,1],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      
      {"id":27, "key":"firstPushHeightIdx", "liftTypes":[4,6],"units":"index"},
      {"id":102, "key":"firstPushHeight", "liftTypes":[4,6],"name":"First Push Height","description":"Bar height after first push","units":"m","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      

      //deadlifts
      {"id":42, "key":"deadliftFinishIdx", "liftTypes":[3],"units":"index"},  //the negative force at the top of the pull
      
      {"id":127, "key":"deadliftPullIdx", "liftTypes":[3],"units":"index"},  //when we start to pull
      {"id":46, "key":"deadliftPull", "liftTypes":[3],"name":"Deadlift Force","description":"Max force of pull for deadlift","units":"m/s2", "simple": true,
            "ranges":[0,95,135,185],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":47, "key":"deadliftPullTime", "liftTypes":[3],"name":"Deadlift Pull Time","description":"Duration of deadlift","units":"sec", "simple": true,
            "ranges":[0,1.5,1.8,2],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":126, "key":"deadliftPullRatio", "liftTypes":[3],"name":"Deadlift Force Ratio","description":"Ratio of deadlift force to weight on the bar","units":"%", "simple": true,
            "ranges":[0,1.5,1.8,2],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},


      //squats
      {"id":89, "key":"squatBottomIdx", "liftTypes":[5,7],"units":"index"},
      {"id":90, "key":"squatBottom", "liftTypes":[5,7],"units":"m"},

      {"id":93, "key":"squatBottomForceIdx", "liftTypes":[5,7],"units":"index"},
      {"id":94, "key":"squatBottomForce", "liftTypes":[5,7],"name":"Squat Bottom Force","description":"This is the max force at the bottom of the squat.","units":"m/s2","simple": true,
            "ranges":[0,50,150,185],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":95, "key":"squatVelStartIdx", "liftTypes":[5],"units":"index"},
      {"id":96, "key":"squatVelEndIdx", "liftTypes":[5],"units":"index"},

      {"id":97, "key":"squatStartMinIdx", "liftTypes":[5,7],"units":"index"},
      {"id":98, "key":"squatStartMin", "liftTypes":[5,7],"units":"m/s2"},

      {"id":99, "key":"squatEndMinIdx", "liftTypes":[5],"units":"index"},
      {"id":100, "key":"squatEndMin", "liftTypes":[5],"units":"m/s2"},


      {"id":102, "key":"squatDepth", "liftTypes":[5],"name":"Squat Depth","description":"Squat Depth","units":"m","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":103, "key":"squatTime", "liftTypes":[5],"name":"Squat Time","description":"Time from start of squat to end of squat","units":"sec","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      //thruster

      {"id":132, "key":"thrusterEndMinIdx", "liftTypes":[7],"units":"index"},
      {"id":133, "key":"thrusterEndMin", "liftTypes":[7],"units":"m/s2"},


      {"id":130, "key":"thrusterTime", "liftTypes":[7],"name":"Thruster Time","description":"Time from bottom of squat to overhead.","units":"sec","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      
      {"id":131, "key":"thrusterPushRatio", "liftTypes":[7],"name":"Thruster Push Ratio","description":"Time from bottom of squat to overhead.","units":"sec","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":93, "key":"thursterPushIdx", "liftTypes":[7],"units":"index"},
      {"id":94, "key":"thursterPush", "liftTypes":[7],"name":"Thruster Push","description":"The push force of a thurster.","units":"m/s2","simple": true,
            "ranges":[0,50,150,185],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},


      //bench press
      {"id":89, "key":"benchBottomIdx", "liftTypes":[10],"units":"index"},
      {"id":90, "key":"benchBottom", "liftTypes":[10],"units":"m"},

      {"id":93, "key":"benchBottomForceIdx", "liftTypes":[10],"units":"index"},
      {"id":94, "key":"benchBottomForce", "liftTypes":[10],"name":"bench Bottom Force","description":"This is the max force at the bottom of the bench.","units":"m/s2","simple": true,
            "ranges":[0,50,150,185],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},

      {"id":95, "key":"benchVelStartIdx", "liftTypes":[10],"units":"index"},
      {"id":96, "key":"benchVelEndIdx", "liftTypes":[10],"units":"index"},

      {"id":97, "key":"benchStartMinIdx", "liftTypes":[10],"units":"index"},
      {"id":98, "key":"benchStartMin", "liftTypes":[10],"units":"m/s2"},

      {"id":99, "key":"benchEndMinIdx", "liftTypes":[10],"units":"index"},
      {"id":100, "key":"benchEndMin", "liftTypes":[10],"units":"m/s2"},

      {"id":102, "key":"benchDepth", "liftTypes":[10],"name":"bench Depth","description":"bench Depth","units":"m","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},
      {"id":102, "key":"benchTime", "liftTypes":[10],"name":"bench Time","description":"Time from start of bench to end of bench","units":"sec","simple": true,
            "ranges":[0,1,2,3],"colors":['formRed','formGreen','formOrange'],"sounds":['','','']},


      //vertical leap
      {"id":110, "key":"jumpForceIdx", "liftTypes":[93],"units":"index"},
      {"id":111, "key":"landingForceIdx", "liftTypes":[93],"units":"index"},
      {"id":112, "key":"takeoffIdx", "liftTypes":[93],"units":"index"},  
      {"id":113, "key":"touchdownIdx", "liftTypes":[93],"units":"index"},
      {"id":114, "key":"startElev", "liftTypes":[93],"units":"m"},
      {"id":115, "key":"maxElev", "liftTypes":[93],"units":"m"},

      {"id":16, "key":"jumpForce", "liftTypes":[93],"name":"jump force","description":"The maximum force on the takeoff of the jump.","units":"m/s2","simple": true,
            "ranges":[0,100,200,300],"colors":['formRed','formOrange','formGreen'],"sounds":['','','']},
      {"id":117, "key":"hangTime", "liftTypes":[93],"name":"hang time","description":"The time in the air on the vertical jump.","units":"s","simple": true,
            "ranges":[0,.2,.6,1],"colors":['formRed','formOrange','formGreen'],"sounds":['','','']},
      {"id":118, "key":"deltaElev", "liftTypes":[93],"name":"delta elevation","description":"Vertical jump height, measured by elevation","units":"in","simple": true,
            "ranges":[0,.2,.6,1],"colors":['formRed','formOrange','formGreen'],"sounds":['','','']},

      //session metrics
      {"id":119, "key":"timeLastLift","session":true,"name":"Rest Time","description":"Time since last lift","units":"time"},
      {"id":120, "key":"sessionTime","session":true, "name":"Total Time","description":"Total session time","units":"time"},
      {"id":121, "key":"numOfLifts","session":true, "name":"Lifts","description":"Total session lifts","units":"lifts"},
      {"id":122, "key":"avgRest","session":true, "name":"Average Rest","units":"time"},
      {"id":123, "key":"totalWork","session":true, "name":"Total Work","description":"Total work for all lifts.","units":"kJ"},
      {"id":125, "key":"avgPower","session":true, "name":"Average Power","description":"Average power for session.","units":"watts"},
      
      {"id":124, "key":"3repSpeed","session":true, "name":"3 Rep Speed","description":"Speed of last three reps","units":"lifts/min"},

      // live metrics
      {"id":72, "key":"liveAccel","name":"Live Accel","units":"lbsf"},
      {"id":73, "key":"liveForce","name":"Live Force","units":"lbsf"},
      {"id":74, "key":"liveVelocity","name":"Live Velocity","units":"m/2"},
      {"id":75, "key":"liveHeight","name":"Live Height","units":"m"},
      {"id":76, "key":"maxVelocity","name":"Max Velocity","units":"m/2"},
      {"id":77, "key":"maxForce","name":"Max Force(10s)","units":"lbsf"},


      //old stuff

      {"id":89, "key":"hipDriveVal", "liftTypes":"1","name":"Max Hip Drive","description":"Maximum Hip Drive Force","units":"m/s2"},


      {"id":15, "key":"firstPullAvg", "liftTypes":"1,4,2","name":"First Pull Avg","description":"Average first pull value","units":"lbsf"},
      {"id":16, "key":"hipDriveAvg", "liftTypes":"1,4,2","name":"Hip Drive Avg","description":"Average hip drive value","units":"lbsf"},

      {"id":17, "key":"floatVal", "liftTypes":"1,2,4","name":"Float Value","description":"Minimum force between hips to shoulders","units":"lbsf"},
      
      {"id":19, "key":"firstPullVal", "liftTypes":"1,4,2","name":"Max First Pull","description":"Maximum First Pull Force","units":"lbsf"},
      {"id":20, "key":"dipVal", "liftTypes":"1,4,2","name":"Dip Value","description":"Minimum force between knees and hips","units":"lbsf"},
      {"id":21, "key":"catchVal", "liftTypes":"1,4,2","name":"Catch Value","description":"Catch at rack position","units":"lbsf"},
      {"id":22, "key":"cleanBarVel", "liftTypes":"1,4,2","name":"Max Bar Speed","description":"Maximum Bar Speed","units":"m/s"},




      {"id":50, "key":"squatStartStartIdx", "liftTypes":"5","name":"Squat Start Index","description":"Index of minimum Start","units":"index"},
      {"id":51, "key":"squatStartEndIdx", "liftTypes":"5","name":"Squat Start Index","description":"Index of minimum Start","units":"index"},
      {"id":52, "key":"squatStartMinIdx", "liftTypes":"5","name":"Squat Start Index","description":"Index of minimum Start","units":"index"},
      {"id":53, "key":"squatStartTime", "liftTypes":"5","name":"Squat Start time","description":"Duration of squat Start","units":"sec"},
      {"id":54, "key":"squatStartMinVal", "liftTypes":"5","name":"Squat Start Val","description":"Value of minimum Start","units":"lbsf"},

      {"id":55, "key":"squatEndStartIdx", "liftTypes":"5","name":"Squat End Index","description":"Index of minimum End","units":"index"},
      {"id":56, "key":"squatEndEndIdx", "liftTypes":"5","name":"Squat End Index","description":"Index of minimum End","units":"index"},
      {"id":57, "key":"squatEndMinIdx", "liftTypes":"5","name":"Squat End Index","description":"Index of minimum End","units":"index"},
      {"id":58, "key":"squatEndTime", "liftTypes":"5","name":"Squat End time","description":"Duration of squat End","units":"sec"},
      {"id":59, "key":"squatEndMinVal", "liftTypes":"5","name":"Squat End Val","description":"Value of minimum End","units":"lbsf"},

      {"id":60, "key":"squatPushMax", "liftTypes":"5","name":"Squat Push Max","description":"Value of maximum push","units":"lbsf"},
      {"id":61, "key":"squatPushAvg", "liftTypes":"5","name":"Squat Push Avg","description":"Value of average push","units":"lbsf"},
      {"id":62, "key":"squatPushAvgErr", "liftTypes":"5","name":"Squat Push Avgerr","description":"Value of average error","units":"lbsf"},
      {"id":63, "key":"squatPushTime", "liftTypes":"5","name":"Squat Push Time","description":"Time of squat push","units":"sec"},
      {"id":64, "key":"squatVelMin", "liftTypes":"5","name":"Min Squat Speed","description":"Value of minimum velocity","units":"m/2"},
      {"id":65, "key":"squatVelMax", "liftTypes":"5","name":"Max Squat Speed","description":"Value of maximum velocity","units":"m/2"},
    ];

    service.sounds = [
            {name:''},
            {name:'success', path : 'media/success.wav'},
            {name:'din-ding', path : 'media/din-ding.wav'},
            {name:'buzzer', path : 'media/buzzer.wav'}
    ]

    service.FORM_SERVICE = '7a6f0000-40bd-4b77-b7b4-de8a2c3048b7';
    service.ACCELEROMETER_SERVICE = '7a6f0000-40bd-4b77-b7b4-de8a2c3048b7';
    service.ACCELEROMETER_DATA = '7a6f0001-40bd-4b77-b7b4-de8a2c3048b7';
    service.ACCELEROMETER_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

    service.STATUS_SERVICE = '7a6f0000-40bd-4b77-b7b4-de8a2c3048b7';
    service.STATUS_DATA = '7a6f0004-40bd-4b77-b7b4-de8a2c3048b7';
    service.STATUS_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';

    service.VISION_DATA = '0000ffe1-0000-1000-8000-00805f9b34fb';
    service.VISION_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';


    service.BATTERY_SERVICE = '0000180f-0000-1000-8000-00805f9b34fb';
    service.BATTERY_DATA = '00002a19-0000-1000-8000-00805f9b34fb';
    service.BATTERY_NOTIFICATION = '00002902-0000-1000-8000-00805f9b34fb';
    

    service.COMMAND_UUID = '7a6f0002-40bd-4b77-b7b4-de8a2c3048b7';


    service.LED_UUID = '7a6f0003-40bd-4b77-b7b4-de8a2c3048b7';



    service.liftTypeByID = function(id){
        return _.findWhere(service.liftTypes,{'id':id});
    };
    service.liftTypeParent = function(id){
        return _.findWhere(service.liftTypes,{'id':id}).parent;
    };

    service.metricByKey = function(key){
      return _.findWhere(service.metricMaster,{'key':key});  
    };


    service.roundSigFigs = function(num, n) {
        if(num == 0) {
            return 0;
        }
        if(num<1 && num>-1){n = n-1;}

        var d = Math.ceil(Math.log10(num < 0 ? -num: num));
        var power = n - d;
        var magnitude = Math.pow(10, power);
        var shifted = Math.round(num*magnitude);
        return shifted/magnitude;
    };

    service.mySmooth2 = function(data,filt){
        var unzip = _.unzip(data)
        return _.zip(unzip[0],service.mySmooth(unzip[1],filt))
    }

    //this will take some data and smooth it 
    service.mySmooth = function(data,filt){
        if(filt==undefined){filt = [0.1,0.2,0.4,0.6,0.4,0.2,0.1];}
        var len = filt.length;
        var sumFilt = _.reduce(filt,function(m, f){ return m+f;},0);
        var normFilt = _.map(filt,function(f){return f/sumFilt});
        return _.map(data,function(v,idx){
            if(idx<parseInt(len/2)){
              idx = parseInt(len/2);
            }else if(idx>=data.length-parseInt(len/2)){
              idx = data.length-parseInt(len/2)-1;
            }
            return _.reduce(_.range(filt.length), function(memo, i){ return memo + normFilt[i]*data[idx+i-parseInt(len/2)]; }, 0);
        });
    };

   service.bufferToHexStr = function(buffer, offset, numBytes){
        var hex = ''
        for (var i = 0; i < numBytes; ++i){
            hex += byteToHexStr(buffer[offset + i])
        }
        return hex
    };

    /**
     * Convert byte number to hex string.
     */
    service.byteToHexStr = function(d){
        if (d < 0) { d = 0xFF + d + 1 }
        var hex = Number(d).toString(16)
        var padding = 2
        while (hex.length < padding){
            hex = '0' + hex
        }
        return hex
    };

    service.timeStr = function(secs) {
        if(secs==undefined || secs > (60*60*24)){return'--';}
        var h = parseInt(secs/3600);
        var m = parseInt((secs%3600)/60);
        var s = parseInt((secs%3600)%60);
        var t = "";
        
        if(h>0){t+=h+':';}
        if(h>0 || m>0){t+= ('0'+m).substr(-2);}
        t+= ':'+('0'+s).substr(-2);
        //console.log(secs,h,m,s,'0'+s,('0'+s).substr(-2),t)
        return t;
    };

    service.myAverage = function(a) {
        var r = {mean: 0, variance: 0, deviation: 0,avgErr:0}, t = a.length;
        for(var m, s = 0, l = t; l--; s += a[l]);
        for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
        for(var e=0,l = t; l--; e += Math.abs(a[l]-m));
        return r.deviation = Math.sqrt(r.variance = s / t),r.avgErr=e/t, r;
    };

    service.downloadCSV = function(csvData,title){
      var csvContent = "data:text/csv;charset=utf-8,";
              
      csvContent = _.reduce(csvData, function(memo, line){ return memo + line.join(",")+"\n"; }, csvContent);

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", title+".csv");
      link.click();

    };

    service.getMetricRange = function(val,metric){
        if(!_.has(metric,'ranges')){
            return undefined;
        }

        var i=2;
        if(val<metric.ranges[1]){
            i=0;
        }else if(val<metric.ranges[2]){
            i=1;
        }
        return i;
    };
    service.evalColors = function(input){
        var lookup = {
            'formOrange': '#e59c4d',
            'formGreen': '#51b97e',
            'formRed': '#e73827',
            'formBlue' : '#50b3d3',
            'formGrey': '#293543'};
        return _.map(input,function(x){
            if(_.has(lookup,x)){return lookup[x];}
            return x;
        });   
    };

    service.fixMetricUnits = function(val, metric, weight){
        var units = metric.units;
        if(units=='m/s2'){
            //lets change this to lbs for now
            val = (val/9.8+1)*weight;
            units = 'lbs';
        }
        if(units=='ratio'){
            units = '';
        }
        if(units=='%'){
            val = 100*val;
            units = '%';
        }

        val = service.roundSigFigs(val,3);
        return [val, units];
    };


    return service;

}]);