//This is for all the configuration we need
var app = angular.module("twc");

//FormGlobals set up all the constants that we need
app.factory('Globals', [function() {

    var service = {};








    service.datesOLD = [
        'October 20, 2014','October 21, 2014','October 27, 2014','October 29, 2014',  //5
        'November 11, 2014','November 13, 2014','November 17, 2014','','November 19, 2014',  //10
        'December 4, 2014','December 11, 2014','December 11, 2014','January 4, 2015','January 8, 2015',  //15
        'January 11, 2015','January 12, 2015','January 23, 2015','January 29, 2015','February 2, 2015',  //20
        'February 9, 2015','February 10, 2015','February 17, 2015','February 24, 2015',


    ];


    //team1,team2,score1,score2,field,game,date
    




    service.gamesOLD = [

        [//1      10-15-2014
            ['corey','sam',21,12],['corey','sam',21,10],['corey','sam',21,12],
            ['scott','andy',22,20],['scott','andy',21,9],['scott','andy',21,13],
            ['scott','sam',21,5],['scott','sam',21,14],['scott','sam',21,10],
            ['corey','andy',21,13],['corey','andy',21,17],['corey','andy',21,11],
            ['corey','scott',22,20],['scott','corey',21,12],['scott','corey',21,18],['scott','corey',22,20],
            ['andy','sam',21,17],['andy','sam',21,16],['sam','andy',22,20],['andy','sam',21,19],
        ],[     // 10-18-2014
            ['peter','aj',22,20],['peter','aj',21,16],['peter','aj',21,12],
            ['joe','matt',21,16],['matt','joe',21,18],['joe','matt',22,20],['joe','matt',21,11],
            ['aj','matt',27,25],['matt','aj',21,13],['matt','aj',23,21],['matt','aj',23,21],
            ['joe','peter',21,16],['joe','peter',21,19],['joe','peter',21,19],
            ['matt','peter',21,14],['matt','peter',21,11],['matt','peter',22,20],
            ['joe','aj',21,19],['joe','aj',21,15],['joe','aj',21,19],
        ],[  //10-22-2014
            ['aj','james',21,14],['aj','james',23,21],['james','aj',21,5],['james','aj',21,14],['james','aj',21,10],
            ['steve','spike',21,15],['steve','spike',21,13],['steve','spike',21,10],
            ['james','steve',21,17],['james','steve',21,10],['steve','james',21,17],['steve','james',21,11],['steve','james',21,16],
            ['aj','spike',21,15],['aj','spike',21,11],['spike','aj',21,15],['aj','spike',21,11],
            ['aj','steve',21,16],['steve','aj',21,11],['aj','steve',22,20],['steve','aj',21,10],['steve','aj',21,15],
            ['james','spike',21,12],['james','spike',21,16],['spike','james',26,24],['james','spike',21,17],
        ],[//5
            ['cedar','connie',21,18],['cedar','connie',21,12],['cedar','connie',21,15],
            ['tim','gary',21,16],['tim','gary',21,16],['gary','tim',21,19],['gary','tim',21,14],['gary','tim',21,18],
            ['tim','connie',21,10],['tim','connie',21,11],['tim','connie',21,12],
            ['gary','cedar',21,17],['cedar','gary',21,10],['cedar','gary',21,19],['cedar','gary',21,13],
            ['tim','cedar',21,10],['tim','cedar',21,8],['tim','cedar',21,13],
            ['gary','connie',21,12],['gary','connie',21,8],['gary','connie',21,12],
        ],[
            ['steve','jeanine',21,14],['steve','jeanine',21,14],['steve','jeanine',21,7],
            ['feeney','mike',21,18],['feeney','mike',21,14],['feeney','mike',21,19],
            ['feeney','steve',21,9],['steve','feeney',21,19],['steve','feeney',21,19],['feeney','steve',21,12],['steve','feeney',21,17],
            ['jeanine','mike',21,12],['jeanine','mike',21,11],['jeanine','mike',21,8],
            ['feeney','jeanine',21,9],['feeney','jeanine',21,15],['feeney','jeanine',21,16],
            ['steve','mike',21,14],['steve','mike',21,6],['steve','mike',21,11],
        ],[
            ['james','thies',21,3],['james','thies',21,8],['james','thies',21,7],
            ['alex','seth',21,18],['alex','seth',23,21],['alex','seth',21,19],
            ['alex','thies',21,8],['alex','thies',21,6],['alex','thies',21,11],
            ['james','seth',21,16],['james','seth',21,10],['james','seth',21,11],
            ['james','alex',21,18],['james','alex',21,9],['james','alex',21,14],
            ['seth','thies',21,8],['seth','thies',21,8],['seth','thies',21,11],
        ],[
            ['peter','cedar',21,19],['peter','cedar',21,9],['peter','cedar',21,10],
            ['feeney','alex',21,11],['feeney','alex',21,6],['feeney','alex',21,14],
            ['feeney','peter',21,15],['feeney','peter',21,14],['feeney','peter',21,18],
            ['cedar','alex',21,18],['cedar','alex',21,17],['cedar','alex',21,13],
            ['feeney','cedar',21,13],['feeney','cedar',21,16],['cedar','feeney',21,14],['feeney','cedar',21,11],
            ['peter','alex',21,14],['peter','alex',21,16],['peter','alex',21,15],
        ],[
            ['scott','keegan',21,12],['scott','keegan',21,8],['scott','keegan',21,7],
            ['matt','gary',21,17],['matt','gary',21,15],['matt','gary',21,15],
            ['matt','keegan',21,17],['matt','keegan',21,13],['matt','keegan',21,15],
            ['scott','gary',21,11],['scott','gary',21,14],['scott','gary',21,15],
            ['keegan','gary',21,17],['gary','keegan',21,12],['gary','keegan',22,20],['gary','keegan',22,20],
            ['scott','matt',21,17],['scott','matt',22,20],['matt','scott',21,16],['matt','scott',21,15],['scott','matt',21,11],
        ],[//10
            ['corey','thies',21,9],['corey','thies',21,3],['corey','thies',21,6],
            ['tim','jeanine',21,10],['tim','jeanine',21,10],['tim','jeanine',21,13],
            ['tim','corey',21,14],['tim','corey',21,17],['tim','corey',21,13],
            ['jeanine','thies',21,10],['jeanine','thies',21,9],['jeanine','thies',21,16],
            ['tim','thies',21,5],['tim','thies',21,2],['tim','thies',21,2],
            ['jeanine','corey',21,16],['corey','jeanine',21,15],['corey','jeanine',21,7],['corey','jeanine',21,19],
        ],[
            ['keegan','cubby',21,9],['keegan','cubby',21,13],['keegan','cubby',21,11],
            ['keegan','spike',21,9],['spike','keegan',21,19],['keegan','spike',21,12],['keegan','spike',21,9],
            ['keegan','emma',21,13],['keegan','emma',21,17],['keegan','emma',21,10],
            ['spike','emma',21,17],['spike','emma',21,8],['emma','spike',23,21],['spike','emma',21,9],
            ['emma','cubby',21,16],['cubby','emma',21,10],['cubby','emma',22,20],['emma','cubby',21,11],['cubby','emma',21,11],
            ['cubby','spike',21,5],['cubby','spike',21,19],['spike','cubby',21,14],['spike','cubby',22,20],['cubby','spike',21,12],
        ],[
            ['joe','seth',21,9],['joe','seth',21,14],['joe','seth',21,6],
            ['andy','cubby',21,19],['andy','cubby',21,16],['andy','cubby',21,13],
            ['seth','andy',21,18],['andy','seth',21,19],['andy','seth',21,14],['andy','seth',21,14],
            ['joe','cubby',21,7],['joe','cubby',21,7],['joe','cubby',21,7],
            ['andy','joe',22,20],['joe','andy',21,18],['joe','andy',21,14],['joe','andy',21,16],
            ['cubby','seth',21,13],['seth','cubby',23,21],['cubby','seth',21,18],['cubby','seth',21,18],
        ],[
            ['connie','mike',22,20],['connie','mike',21,15],['connie','mike',21,9],
            ['sam','emma',21,16],['emma','sam',21,19],['sam','emma',21,13],['sam','emma',21,13],
            ['mike','emma',24,22],['emma','mike',21,14],['emma','mike',21,8],['mike','emma',21,14],['emma','mike',22,20],
            ['sam','connie',21,16],['sam','connie',21,13],['connie','sam',21,14],['sam','connie',21,9],
            ['sam','mike',21,18],['sam','mike',21,17],['mike','sam',21,13],['mike','sam',21,16],['mike','sam',21,11],
            ['connie','emma',21,16],['connie','emma',21,19],['emma','connie',21,19],['connie','emma',21,19],
        ],[
            ['matt','james',21,14],['matt','james',21,15],['james','matt',21,11],['matt','james',21,14],
            ['corey','feeney',21,11],['corey','feeney',21,13],['corey','feeney',21,17],
            ['matt','feeney',21,17],['feeney','matt',21,13],['feeney','matt',21,19],['feeney','matt',21,16],
            ['corey','james',21,10],['corey','james',21,11],['corey','james',21,15],
            ['feeney','james',21,9],['feeney','james',21,15],['feeney','james',21,14],
            ['corey','matt',21,15],['corey','matt',21,19],['corey','matt',21,16],
        ],[//15
            ['seth','spike',21,15],['seth','spike',21,17],['spike','seth',21,15],['spike','seth',21,15],['seth','spike',21,18],
            ['sam','thies',21,7],['sam','thies',21,9],['sam','thies',21,5],
            ['sam','spike',21,18],['sam','spike',21,12],['sam','spike',21,14],
            ['seth','thies',21,0],['seth','thies',21,9],['seth','thies',21,11],
            ['spike','thies',21,11],['spike','thies',21,15],['spike','thies',21,10],
            ['sam','seth',21,17],['seth','sam',21,16],['sam','seth',21,19],['seth','sam',21,18],['seth','sam',21,19],
        ],[
            ['scott','steve',21,10],['scott','steve',23,21],['steve','scott',23,21],['steve','scott',21,16],['scott','steve',21,11],
            ['joe','tim',21,14],['joe','tim',21,19],['tim','joe',21,19],['tim','joe',21,13],['joe','tim',21,17],
            ['scott','joe',21,13],['scott','joe',21,14],['scott','joe',21,18],
            ['steve','tim',21,12],['steve','tim',21,12],['steve','tim',21,18],
            ['scott','tim',21,17],['scott','tim',21,12],['tim','scott',21,13],['scott','tim',21,10],
            ['steve','joe',22,20],['steve','joe',21,16],['joe','steve',21,19],['steve','joe',21,18],
        ],[
            ['peter','jeanine',21,17],['jeanine','peter',21,17],['peter','jeanine',21,13],['peter','jeanine',21,14],
            ['peter','cubby',21,13],['peter','cubby',21,13],['peter','cubby',21,16],
            ['jeanine','cubby',21,17],['jeanine','cubby',23,21],['jeanine','cubby',21,16],
        ],[
            ['andy','cedar',22,20],['cedar','andy',21,10],['andy','cedar',25,23],['cedar','andy',21,19],['andy','cedar',21,19],
            ['aj','keegan',21,15],['aj','keegan',21,17],['keegan','aj',21,11],['keegan','aj',21,8],['keegan','aj',22,20],
            ['andy','keegan',21,10],['andy','keegan',21,10],['keegan','andy',21,18],['keegan','andy',21,19],['andy','keegan',21,16],
            ['cedar','aj',21,13],['cedar','aj',21,9],['cedar','aj',21,15],
            ['cedar','keegan',21,16],['cedar','keegan',21,6],['cedar','keegan',21,19],
            ['andy','aj',21,15],['andy','aj',21,18],['andy','aj',21,14],
        ],[
            ['connie','emma',21,19],['emma','connie',21,15],['connie','emma',21,10],['connie','emma',21,13],
            ['alex','connie',21,10],['alex','connie',21,12],['alex','connie',21,13],
            ['alex','emma',21,12],['alex','emma',21,11],['alex','emma',21,12],
        ],[//20
            ['tim','james',21,11],['tim','james',21,9],['james','tim',21,15],['tim','james',21,17],
            ['andy','peter',21,18],['peter','andy',21,18],['peter','andy',21,15],['peter','andy',22,20],
            ['peter','james',21,8],['peter','james',21,9],['james','peter',21,19],['peter','james',21,14],
            ['tim','andy',22,20],['andy','tim',21,17],['andy','tim',21,19],['tim','andy',21,18],['tim','andy',21,9],
            ['andy','james',21,18],['andy','james',22,20],['james','andy',21,12],['andy','james',21,8],
            ['peter','tim',22,20],['peter','tim',21,17],['tim','peter',21,10],['tim','peter',21,10],['peter','tim',21,8],
        ],[
            ['steve','cedar',21,14],['cedar','steve',21,18],['cedar','steve',21,10],['cedar','steve',21,16],
            ['cedar','matt',21,14],['cedar','matt',21,19],['matt','cedar',21,16],['matt','cedar',21,15],['cedar','matt',21,16],
            ['steve','matt',21,19],['matt','steve',21,17],['matt','steve',21,17],['matt','steve',21,16],
        ],[
            ['scott','corey',24,22],['scott','corey',22,20],['scott','corey',21,15],
            ['feeney','joe',21,7],['feeney','joe',21,5],['feeney','joe',21,17],
            ['feeney','corey',21,9],['feeney','corey',21,15],['feeney','corey',21,11],
            ['scott','joe',21,15],['joe','scott',23,21],['scott','joe',21,5],['joe','scott',21,19],['joe','scott',21,16],
            ['corey','joe',21,10],['joe','corey',22,20],['corey','joe',21,19],['corey','joe',21,19],
            ['feeney','scott',21,15],['scott','feeney',23,21],['feeney','scott',22,20],['feeney','scott',21,15],
        ],[
            ['jeanine','keegan',21,12],['jeanine','keegan',21,18],['keegan','jeanine',21,16],['keegan','jeanine',21,13],['keegan','jeanine',21,17],
            ['sam','connie',21,16],['sam','connie',21,16],['sam','connie',21,15],
            ['sam','jeanine',21,17],['jeanine','sam',21,14],['jeanine','sam',21,18],['jeanine','sam',21,16],
            ['keegan','connie',21,17],['keegan','connie',22,20],['keegan','connie',21,14],
            ['keegan','sam',21,17],['keegan','sam',21,17],['keegan','sam',21,18],
            ['jeanine','connie',21,16],['jeanine','connie',21,7],['jeanine','connie',21,18],
        ],[//24     1-2-2015
            ['cubby','thies',21,16],['cubby','thies',21,9],['cubby','thies',21,15],
            ['aj','seth',21,18],['seth','aj',21,19],['aj','seth',21,12],['aj','seth',22,20],
            ['aj','thies',21,5],['aj','thies',21,6],['aj','thies',21,18],
            ['seth','cubby',21,14],['cubby','seth',21,18],['seth','cubby',21,18],['cubby','seth',21,19],['cubby','seth',21,19],
            ['aj','cubby',21,15],['aj','cubby',21,16],['aj','cubby',21,8],
        ]

    ]


service.newGames = [


        ['2015-11-2',[
            ['Jeanine','Grant',21,18],['Jeanine','Grant',21,15],['Grant','Jeanine',21,15],['Grant','Jeanine',21,12],['Grant','Jeanine',21,17],
            ['Grant','Mike',21,9],['Grant','Mike',21,12],['Grant','Mike',21,15],
            ['Grant','Seth',21,12],['Grant','Seth',21,17],['Grant','Seth',21,12],
        ]],

        ['2015-11-18',[
            ['Tim','Grant',21,8],['Grant','Tim',21,11],['Grant','Tim',21,10],['Grant','Tim',21,11],
            ['Peter','Grant',21,19],['Grant','Peter',21,12],['Grant','Peter',21,16],['Grant','Peter',21,16],
            ['Grant','Cubby',21,5],['Grant','Cubby',21,11],['Grant','Cubby',21,12],
        ]],

        ['2015-12-10',[
            ['James','Grant',21,6],['James','Grant',21,18],['Grant','James',23,21],['Grant','James',21,12],['Grant','James',21,17],
            ['Lu','Grant',21,16],['Lu','Grant',21,13],['Lu','Grant',21,14],
            ['Grant','Corey',21,12],['Corey','Grant',21,14],['Corey','Grant',21,19],['Grant','Corey',21,11],['Grant','Corey',23,21],
        ]],

        ['2016-1-5',[
            ['Steve','Woodley',21,5],['Steve','Woodley',21,3],['Steve','Woodley',21,11],
            ['Feeney','Woodley',21,5],['Feeney','Woodley',21,4],['Feeney','Woodley',21,7],
            ['Keegan','Woodley',21,9],['Keegan','Woodley',21,5],['Keegan','Woodley',21,15],
        ]],
]


    service.newOldGames = [


        ['2015-2-10',[   //last years tourney
            ['Scott','Peter',21,8],['Scott','Peter',21,13],['Scott','Peter',21,15],
            ['Matt','Corey',21,18],['Corey','Matt',21,14],['Corey','Matt',21,14],['Matt','Corey',21,19],['Matt','Corey',23,21],
            ['Feeney','Tim',21,10],['Feeney','Tim',21,16],['Feeney','Tim',21,11],
            ['Steve','Joe',21,14],['Steve','Joe',21,15],['Steve','Joe',21,9],
            ['Scott','Matt',21,16],['Matt','Scott',21,19],['Scott','Matt',26,24],['Scott','Matt',21,14],
            ['Feeney','Steve',21,17],['Feeney','Steve',21,16],['Feeney','Steve',21,9],
            ['Scott','Feeney',23,21],['Scott','Feeney',21,17],['Scott','Feeney',21,18],
            ['Andy','Alex',21,16],['Andy','Alex',21,17],['Andy','Alex',21,16],
            ['Cedar','AJ',21,6],['Cedar','AJ',21,17],['Cedar','AJ',21,18],
            ['Gary','Jeanine',21,18],['Gary','Jeanine',21,9],['Gary','Jeanine',21,19],
            ['Andy','Keegan',21,8],['Andy','Keegan',21,11],['Andy','Keegan',21,11],
            ['Gary','Cedar',22,20],['Cedar','Gary',21,11],['Cedar','Gary',21,18],['Cedar','Gary',21,17],
            ['Andy','Cedar',21,15],['Cedar','Andy',21,17],['Cedar','Andy',21,16],['Andy','Cedar',21,17],['Andy','Cedar',21,14],
            ['Seth','Thies',21,12],['Seth','Thies',21,10],['Seth','Thies',21,8],
            ['Cubby','Connie',21,13],['Cubby','Connie',21,18],['Cubby','Connie',21,11],
            ['Sam','Seth',22,20],['Seth','Sam',21,7],['Seth','Sam',21,19],['Seth','Sam',21,16],
            ['Seth','Cubby',21,19],['Seth','Cubby',21,8],['Seth','Cubby',21,14],
        ]],

        ['2015-10-12',[
            ['Peter','Cedar',21,18],['Cedar','Peter',21,12],['Peter','Cedar',21,18],['Peter','Cedar',21,17],
            ['Feeney','Dot',21,14],['Feeney','Dot',21,8],['Feeney','Dot',21,4],
            ['Cedar','Feeney',21,8],['Cedar','Feeney',21,8],['Cedar','Feeney',21,15],
            ['Peter','Dot',21,9],['Peter','Dot',21,16],['Peter','Dot',21,12],
            ['Peter','Feeney',21,16],['Feeney','Peter',23,21],['Feeney','Peter',21,16],['Feeney','Peter',21,12],
            ['Cedar','Dot',21,12],['Cedar','Dot',21,10],['Cedar','Dot',21,6],
             
        ]],

        ['2015-10-14',[
           ['Corey','Keegan',21,19],['Corey','Keegan',21,16],['Keegan','Corey',23,21],['Corey','Keegan',21,13],
            ['Scott','Alex',21,7],['Scott','Alex',21,9],['Scott','Alex',21,6],
            ['Scott','Keegan',21,17],['Scott','Keegan',21,7],['Scott','Keegan',21,17],
            ['Corey','Alex',21,15],['Corey','Alex',21,18],['Corey','Alex',21,4],
            ['Scott','Corey',21,14],['Corey','Scott',21,15],['Corey','Scott',21,19],['Corey','Scott',21,18],
            ['Keegan','Alex',21,19],['Keegan','Alex',21,13],['Keegan','Alex',21,17],
        ]],

        ['2015-10-18',[
            ['Andy','James',21,9],['James','Andy',21,17],['Andy','James',21,12],['Andy','James',21,14],
            ['Matt','Felix',21,8],['Matt','Felix',21,7],['Matt','Felix',21,8],
            ['Matt','James',21,14],['Matt','James',21,16],['Matt','James',21,15],
            ['Andy','Felix',21,11],['Andy','Felix',21,12],['Andy','Felix',21,19],
            ['Matt','Andy',21,19],['Andy','Matt',21,15],['Matt','Andy',23,21],['Matt','Andy',21,18],
            ['James','Felix',21,12],['James','Felix',21,17],['James','Felix',21,13],
        ]],

        ['2015-10-26',[
            ['Spike','AJ',23,21],['AJ','Spike',21,13],['AJ','Spike',21,12],['AJ','Spike',21,13],
            ['Cubby','Thies',21,11],['Thies','Cubby',22,20],['Cubby','Thies',21,11],['Cubby','Thies',21,11],
            ['Cubby','Spike',21,14],['Spike','Cubby',22,20],['Spike','Cubby',24,22],['Cubby','Spike',21,18],['Cubby','Spike',21,16],
            ['AJ','Thies',21,13],['AJ','Thies',21,14],['AJ','Thies',21,15],
            ['AJ','Cubby',21,6],['Cubby','AJ',21,13],['Cubby','AJ',21,17],['AJ','Cubby',21,16],['Cubby','AJ',21,13],
            ['Spike','Thies',21,19],['Spike','Thies',21,15],['Spike','Thies',21,10],
        ]],

        ['2015-11-2',[
            ['Jeanine','Grant',21,18],['Jeanine','Grant',21,15],['Grant','Jeanine',21,15],['Grant','Jeanine',21,12],['Grant','Jeanine',21,17],
            ['Seth','Mike',21,11],['Seth','Mike',21,11],['Seth','Mike',21,8],
            ['Seth','Jeanine',27,25],['Jeanine','Seth',21,10],['Jeanine','Seth',21,13],['Jeanine','Seth',21,17],
            ['Grant','Mike',21,9],['Grant','Mike',21,12],['Grant','Mike',21,15],
            ['Grant','Seth',21,12],['Grant','Seth',21,17],['Grant','Seth',21,12],
            ['Jeanine','Mike',21,15],['Jeanine','Mike',21,16],['Jeanine','Mike',21,12],
        ]],
        ['2015-11-3',[
            ['Erin','Claire',21,13],['Claire','Erin',21,15],['Claire','Erin',21,19],['Claire','Erin',21,14],
            ['Kiel','Zach',23,21],['Kiel','Zach',21,18],['Kiel','Zach',21,17],
            ['Erin','Zach',21,13],['Zach','Erin',21,17],['Erin','Zach',21,11],['Erin','Zach',21,17],
            ['Claire','Kiel',21,15],['Claire','Kiel',21,16],['Kiel','Claire',21,15],['Kiel','Claire',21,15],['Claire','Kiel',21,18],
            ['Claire','Zach',21,16],['Claire','Zach',21,13],['Claire','Zach',21,15],
            ['Erin','Kiel',21,16],['Erin','Kiel',21,18],['Erin','Kiel',21,14],
        ]],
        ['2015-11-3',[
           ['Tim','Lu',21,11],['Lu','Tim',24,22],['Lu','Tim',26,24],['Lu','Tim',22,20],
            ['Steve','Amy',21,12],['Steve','Amy',21,15],['Steve','Amy',21,15],
            ['Steve','Lu',21,16],['Lu','Steve',21,16],['Steve','Lu',21,15],['Steve','Lu',21,11],
            ['Tim','Amy',21,15],['Tim','Amy',21,8],['Tim','Amy',21,12],
            ['Steve','Tim',21,16],['Tim','Steve',21,16],['Steve','Tim',21,19],['Tim','Steve',21,17],['Steve','Tim',21,14],
            ['Lu','Amy',21,12],['Lu','Amy',21,4],['Lu','Amy',21,12],
        ]],
        ['2015-11-12',[
            ['Lu','Andy',21,19],['Lu','Andy',24,22],['Andy','Lu',21,16],['Lu','Andy',21,19],
            ['Scott','Feeney',21,13],['Scott','Feeney',21,9],['Scott','Feeney',21,18],
            ['Lu','Scott',21,14],['Scott','Lu',21,19],['Scott','Lu',21,13],['Lu','Scott',22,20],['Scott','Lu',21,19],
            ['Feeney','Andy',21,11],['Feeney','Andy',21,15],['Feeney','Andy',21,7],
            ['Scott','Andy',21,11],['Scott','Andy',21,7],['Scott','Andy',21,8],
            ['Lu','Feeney',21,18],['Feeney','Lu',21,13],['Lu','Feeney',22,20],['Lu','Feeney',21,19],
        ]],
        ['2015-11-16',[ 
            ['Keegan','Claire',21,13],['Keegan','Claire',21,8],['Keegan','Claire',21,16],
            ['James','AJ',22,20],['James','AJ',21,14],['James','AJ',21,10],
            ['James','Claire',21,10],['James','Claire',21,3],['James','Claire',21,8],
            ['Keegan','AJ',21,10],['AJ','Keegan',21,15],['Keegan','AJ',21,13],['Keegan','AJ',21,15],
            ['AJ','Claire',21,14],['AJ','Claire',21,11],['AJ','Claire',21,3],
            ['James','Keegan',21,16],['Keegan','James',21,15],['James','Keegan',22,20],['James','Keegan',21,12],
        ]],

        ['2015-11-18',[
            ['Tim','Grant',21,8],['Grant','Tim',21,11],['Grant','Tim',21,10],['Grant','Tim',21,11],
            ['Peter','Cubby',21,15],['Peter','Cubby',21,9],['Peter','Cubby',21,18],
            ['Peter','Grant',21,19],['Grant','Peter',21,12],['Grant','Peter',21,16],['Grant','Peter',21,16],
            ['Tim','Cubby',21,9],['Tim','Cubby',21,11],['Tim','Cubby',21,11],
            ['Peter','Tim',21,18],['Tim','Peter',21,19],['Peter','Tim',21,16],['Peter','Tim',21,14],
            ['Grant','Cubby',21,5],['Grant','Cubby',21,11],['Grant','Cubby',21,12],
        ]],

        ['2015-11-19',[
            ['Corey','Steve',21,18],['Corey','Steve',21,17],['Corey','Steve',21,15],
            ['Matt','Cedar',21,12],['Cedar','Matt',21,19],['Matt','Cedar',21,15],['Cedar','Matt',21,9],['Matt','Cedar',22,20],
            ['Matt','Steve',21,18],['Matt','Steve',21,14],['Matt','Steve',21,16],
            ['Cedar','Corey',22,20],['Cedar','Corey',21,12],['Corey','Cedar',21,11],['Corey','Cedar',21,13],['Corey','Cedar',21,13],
            ['Corey','Matt',21,17],['Corey','Matt',21,10],['Corey','Matt',21,18],
            ['Steve','Cedar',21,9],['Steve','Cedar',21,17],['Cedar','Steve',21,10],['Steve','Cedar',21,13],
        ]],
        ['2015-11-30',[
            ['Amy','Erin',21,8],['Amy','Erin',21,15],['Amy','Erin',21,16],
            ['Jeanine','Alex',21,16],['Jeanine','Alex',21,8],['Alex','Jeanine',21,15],['Jeanine','Alex',21,12],
            ['Alex','Erin',21,16],['Alex','Erin',21,8],['Alex','Erin',21,13],
            ['Amy','Jeanine',21,18],['Jeanine','Amy',22,20],['Jeanine','Amy',21,11],['Jeanine','Amy',21,9],
            ['Alex','Amy',21,14],['Amy','Alex',21,12],['Alex','Amy',21,14],['Alex','Amy',21,14],
            ['Jeanine','Erin',21,5],['Jeanine','Erin',21,8],['Jeanine','Erin',21,7],
        ]],
        ['2015-12-2',[
            ['Seth','Felix',21,19],['Felix','Seth',21,10],['Felix','Seth',21,9],['Seth','Felix',21,17],['Seth','Felix',21,8],
            ['Spike','Kiel',21,8],['Spike','Kiel',21,9],['Spike','Kiel',21,13],
            ['Felix','Kiel',21,10],['Felix','Kiel',21,8],['Felix','Kiel',21,7],
            ['Seth','Spike',22,20],['Seth','Spike',21,10],['Seth','Spike',21,8],
            ['Seth','Kiel',21,14],['Seth','Kiel',21,14],['Seth','Kiel',21,13],
            ['Felix','Spike',21,17],['Spike','Felix',21,11],['Spike','Felix',21,12],['Felix','Spike',21,15],['Spike','Felix',21,13],
        ]],
        ['2015-12-3',[
            ['Thies','Zach',21,14],['Thies','Zach',23,21],['Thies','Zach',21,13],
            ['Dot','Mike',21,15],['Dot','Mike',21,18],['Mike','Dot',22,20],['Mike','Dot',21,14],['Dot','Mike',21,15],
            ['Dot','Thies',21,5],['Dot','Thies',21,5],['Dot','Thies',21,16],
            ['Mike','Zach',21,4],['Mike','Zach',21,4],['Mike','Zach',21,4],
            ['Dot','Zach',21,7],['Dot','Zach',21,10],['Dot','Zach',21,11],
            ['Mike','Thies',21,11],['Mike','Thies',21,17],['Mike','Thies',21,15],
        ]],
        ['2015-12-10',[
            ['James','Grant',21,6],['James','Grant',21,18],['Grant','James',23,21],['Grant','James',21,12],['Grant','James',21,17],
            ['Corey','Lu',21,14],['Lu','Corey',21,17],['Corey','Lu',21,19],['Lu','Corey',22,20],['Lu','Corey',21,18],
            ['Corey','James',21,18],['James','Corey',21,16],['James','Corey',21,17],['James','Corey',21,15],
            ['Lu','Grant',21,16],['Lu','Grant',21,13],['Lu','Grant',21,14],
            ['Grant','Corey',21,12],['Corey','Grant',21,14],['Corey','Grant',21,19],['Grant','Corey',21,11],['Grant','Corey',23,21],
            ['Lu','James',21,16],['Lu','James',21,10],['Lu','James',21,7],
        ]],
        ['2015-12-14',[
            ['Matt','Peter',21,17],['Matt','Peter',21,18],['Peter','Matt',21,18],['Matt','Peter',21,16],
            ['Scott','Jeanine',21,12],['Scott','Jeanine',21,14],['Scott','Jeanine',21,15],
            ['Scott','Peter',21,14],['Scott','Peter',21,17],['Scott','Peter',21,9],
            ['Matt','Jeanine',21,15],['Matt','Jeanine',21,13],['Matt','Jeanine',21,12],
            ['Scott','Matt',21,16],['Scott','Matt',21,16],['Scott','Matt',21,9],
            ['Peter','Jeanine',23,21],['Peter','Jeanine',21,18],['Peter','Jeanine',22,20],
        ]],
        ['2015-12-17',[
            ['Tim','Cedar',21,18],['Tim','Cedar',21,18],['Cedar','Tim',21,17],['Cedar','Tim',21,7],['Cedar','Tim',21,9],
            ['Andy','AJ',21,16],['Andy','AJ',21,18],['Andy','AJ',21,16],
            ['Tim','AJ',21,17],['Tim','AJ',21,9],['Tim','AJ',21,14],
            ['Cedar','Andy',21,10],['Cedar','Andy',21,12],['Cedar','Andy',21,19],
            ['AJ','Cedar',21,17],['Cedar','AJ',21,7],['Cedar','AJ',21,17],['Cedar','AJ',21,10],
            ['Tim','Andy',21,18],['Andy','Tim',21,15],['Tim','Andy',21,14],['Andy','Tim',21,18],['Tim','Andy',21,13],
        ]],
        ['2015-12-21',[            
            ['Alex','Dot',21,16],['Alex','Dot',21,19],['Alex','Dot',21,9],
            ['Felix','Cubby',21,16],['Felix','Cubby',21,10],['Cubby','Felix',21,19],['Felix','Cubby',21,14],
            ['Felix','Dot',21,15],['Felix','Dot',22,20],['Felix','Dot',21,17],
            ['Alex','Cubby',21,11],['Alex','Cubby',21,11],['Alex','Cubby',21,12],
            ['Cubby','Dot',21,12],['Cubby','Dot',21,13],['Cubby','Dot',21,17],
            ['Felix','Alex',22,20],['Alex','Felix',21,17],['Alex','Felix',21,13],['Alex','Felix',21,18],
        ]],
        ['2016-1-5',[
            ['Feeney','Keegan',21,12],['Feeney','Keegan',23,21],['Feeney','Keegan',21,15],
            ['Steve','Woodley',21,5],['Steve','Woodley',21,3],['Steve','Woodley',21,11],
            ['Steve','Keegan',21,14],['Keegan','Steve',21,15],['Steve','Keegan',21,16],['Steve','Keegan',21,18],
            ['Feeney','Woodley',21,5],['Feeney','Woodley',21,4],['Feeney','Woodley',21,7],
            ['Feeney','Steve',21,15],['Feeney','Steve',21,11],['Feeney','Steve',21,11],
            ['Keegan','Woodley',21,9],['Keegan','Woodley',21,5],['Keegan','Woodley',21,15],
        ]],

        ['2016-1-7',[
           ['Mike','Claire',21,10],['Claire','Mike',22,20],['Mike','Claire',21,10],['Mike','Claire',21,9],
            ['Spike','Erin',21,13],['Spike','Erin',21,18],['Spike','Erin',21,16],
            ['Spike','Claire',21,8],['Spike','Claire',21,4],['Spike','Claire',21,9],
            ['Mike','Erin',21,14],['Mike','Erin',21,10],['Mike','Erin',21,13],
            ['Erin','Claire',21,14],['Erin','Claire',21,13],['Erin','Claire',21,18],
            ['Mike','Spike',21,17],['Mike','Spike',22,20],['Spike','Mike',21,18],['Spike','Mike',21,19],['Spike','Mike',21,17],
        ]],
        ['2016-1-11',[
           ['Kiel','Thies',21,19],['Kiel','Thies',22,20],['Kiel','Thies',21,17],
            ['Amy','Zach',21,7],['Amy','Zach',21,9],['Amy','Zach',21,7],
            ['Amy','Thies',21,12],['Amy','Thies',21,16],['Amy','Thies',21,9],
            ['Kiel','Zach',21,14],['Zach','Kiel',21,6],['Kiel','Zach',21,1],['Zach','Kiel',21,1],['Kiel','Zach',21,19],
            ['Amy','Kiel',21,6],['Amy','Kiel',21,10],['Amy','Kiel',21,4],
            ['Zach','Thies',21,8],['Zach','Thies',21,16],['Thies','Zach',21,19],['Thies','Zach',21,8],['Zach','Thies',22,20],
        ]]

    ]











    service.myAverage = function(a) {
        var r = {mean: 0, variance: 0, deviation: 0,avgErr:0}, t = a.length;
        for(var m, s = 0, l = t; l--; s += a[l]);
        for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
        for(var e=0,l = t; l--; e += Math.abs(a[l]-m));
        return r.deviation = Math.sqrt(r.variance = s / t),r.avgErr=e/t, r;
    };

   
  
    return service;

}]);




    var old = [
        ['dinosaurs','treehouse','13','6','F1','Game 1','10/18/2015'],
        ['shamwow','mile high club','13','2','F2','Game 1','10/18/2015'],
        ['dune squad','honey badgers','13','4','F3','Game 1','10/18/2015'],
        ['aguirre','penultimate','13','4','F4','Game 1','10/18/2015'],
        ['special wobble','sandy bandits','8','13','F5','Game 1','10/18/2015'],
        ['fat unicorn','PPPinata','13','4','F6','Game 1','10/18/2015'],
        ['Elixir','Astro','4','13','F7','Game 1','10/18/2015'],
        ['mimosa sunday','Hammer Time','13','8','F8','Game 1','10/18/2015'],
        ['the nerf herders','no disc','13','7','F9','Game 1','10/18/2015'],
        ['dinosaurs','sandy bandits','13','6','F1','Game 2','10/18/2015'],
        ['shamwow','Elixir','13','4','F2','Game 2','10/18/2015'],
        ['dune squad','mile high club','13','7','F3','Game 2','10/18/2015'],
        ['treehouse','penultimate','13','2','F4','Game 2','10/18/2015'],
        ['special wobble','honey badgers','13','9','F5','Game 2','10/18/2015'],
        ['fat unicorn','aguirre','13','10','F6','Game 2','10/18/2015'],
        ['mimosa sunday','PPPinata','13','11','F7','Game 2','10/18/2015'],
        ['Hammer Time','no disc','7','13','F8','Game 2','10/18/2015'],
        ['the nerf herders','Astro','13','8','F9','Game 2','10/18/2015'],
        ['dinosaurs','special wobble','13','9','F1','Game 1','10/25/2015'],
        ['dune squad','shamwow','15','13','F2','Game 1','10/25/2015'],
        ['penultimate','Astro','10','13','F3','Game 1','10/25/2015'],
        ['aguirre','Hammer Time','13','6','F4','Game 1','10/25/2015'],
        ['sandy bandits','Elixir','13','2','F5','Game 1','10/25/2015'],
        ['mile high club','treehouse','12','14','F6','Game 1','10/25/2015'],
        ['fat unicorn','honey badgers','13','8','F7','Game 1','10/25/2015'],
        ['mimosa sunday','no disc','11','13','F8','Game 1','10/25/2015'],
        ['PPPinata','the nerf herders','6','13','F9','Game 1','10/25/2015'],
        ['special wobble','Elixir','13','6','F1','Game 2','10/25/2015'],
        ['dune squad','dinosaurs','15','14','F2','Game 2','10/25/2015'],
        ['penultimate','no disc','6','13','F3','Game 2','10/25/2015'],
        ['treehouse','aguirre','13','9','F4','Game 2','10/25/2015'],
        ['shamwow','sandy bandits','13','9','F5','Game 2','10/25/2015'],
        ['mile high club','fat unicorn','13','11','F6','Game 2','10/25/2015'],
        ['honey badgers','mimosa sunday','13','15','F7','Game 2','10/25/2015'],
        ['PPPinata','Astro','15','14','F8','Game 2','10/25/2015'],
        ['Hammer Time','the nerf herders','10','13','F9','Game 2','10/25/2015'],
        ['Elixir','honey badgers','9','13','F1','Game 1','11/1/2015'],
        ['mimosa sunday','treehouse','13','0','F2','Game 1','11/1/2015'],
        ['Hammer Time','penultimate','13','5','F3','Game 1','11/1/2015'],
        ['aguirre','Astro','4','13','F4','Game 1','11/1/2015'],
        ['shamwow','special wobble','13','2','F5','Game 1','11/1/2015'],
        ['dinosaurs','mile high club','13','6','F6','Game 1','11/1/2015'],
        ['PPPinata','no disc','13','15','F7','Game 1','11/1/2015'],
        ['Astro','no disc','13','4','F2','Game 2','11/1/2015'],
        ['mimosa sunday','penultimate','13','2','F3','Game 2','11/1/2015'],
        ['honey badgers','aguirre','12','14','F4','Game 2','11/1/2015'],
        ['dinosaurs','shamwow','9','13','F5','Game 2','11/1/2015'],
        ['special wobble','mile high club','13','2','F6','Game 2','11/1/2015'],
        ['Hammer Time','PPPinata','13','3','F7','Game 2','11/1/2015'],
    ];