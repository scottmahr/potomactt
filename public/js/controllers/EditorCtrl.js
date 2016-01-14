var app = angular.module("twc");

app.controller('EditorCtrl', ['$scope','$timeout','$mdDialog','State','Games','Globals', 
      function($scope,$timeout,$mdDialog,State,Games,Globals){
    $scope.s = State;
    $scope.m = {
        rawData:'',
    }
 
    
    $scope.convertRaw = function(){
        return;
        console.log($scope.m.rawData)

        _.each(gamesData,function(g,idx){
            var game = {
                datePlayed:  new Date(g[1]), 
                leagueID:  '5637aa91ef0bfb03002ed187',
                player1: State.getPlayerID(g[3]), 
                player2: State.getPlayerID(g[5]),
                scores: [ [g[2], g[6]] ],  //scores [[0,1],[1,2],[2,2],[0,0],[1,1],[2,3]]
                properties: { game:g[0] }, //who served first, anything like that 
                location: g[4]
            };
            //State.rawGames.push(game)
            $timeout(function(){
                Games.createGame(game);
            },500*idx)

        })
    }

    $scope.loadGames = function(){
        return;

        var dt;
        var count = 0;
        _.each(Globals.newGames,function(day){
            //look at each day
            dt = new Date(day[0]);
            _.each(day[1],function(g,idx){
                //now we look at each game in the day
                //console.log(dt,idx)
                //console.log(parseInt(idx*90/25),tomorrow)

               count ++;
                var game = {
                    datePlayed:  dt, 
                    leagueID:  '5637aac1ef0bfb03002ed188',
                    player1: State.getPlayerID(g[0]), 
                    player2: State.getPlayerID(g[1]),
                    scores: [ [g[2], g[3]] ]  ,  
                };


                $timeout(function(){
                    Games.createGame(game);
                },500*count)



                //console.log(g[0]+','+g[1]+','+g[2]+','+g[3]+','+g[0])
                
            });        
        });

      
    }

}]);


function DialogController($scope,$timeout,$mdDialog,State ) {
    $scope.s = State;
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    

    $scope.orderByLength = function(lifter){
        return -lifter.lifts.length;
    }
}



/*
    "_id": "5637aa91ef0bfb03002ed187",
    "name": "la beach league",
    "type": "frisbee",
    "cDate": "2015-11-02T18:25:21.795Z"
  },
  {
    "_id": "5637aac1ef0bfb03002ed188",
    "name": "potomac ping pong",
    "type": "ping pong",
    "cDate": "2015-11-02T18:26:09.502Z"
  }
  */


  var gamesData = [



['Game 3','11/1/2015',14,'Sandy bandits','F1','dune squad',12],
['Game 3','11/1/2015',9,'Sandy bandits','F1','the nerf herders',3],
['Game 3','11/1/2015',12,'fat unicorn','F1','the nerf herders',3]];


/*
['Game 1','11/8/2015',13,'dune squad','F2','honey badgers',4],
['Game 1','11/8/2015',9,'Elixir','F3','penultimate',13],
['Game 1','11/8/2015',13,'no disc, no life','F4','aguirre, the wrath of god',11],
['Game 1','11/8/2015',15,'hammer time','F5','astronaughty',13],
['Game 1','11/8/2015',12,'treehouse','F6','dinosaurs',14],
['Game 1','11/8/2015',5,'pppinata','F7','mimosa sunday',13],
['Game 1','11/8/2015',3,'fat unicorn','F8','Shamwow',13],
['Game 1','11/8/2015',11,'mile high club','F9','the nerf herders',13],
['Game 1','11/15/2015',7,'honey badgers','F1','astronaughty',13],
['Game 1','11/15/2015',13,'dune squad','F2','aguirre, the wrath of god',4],
['Game 1','11/15/2015',13,'hammer time','F3','penultimate',10],
['Game 1','11/15/2015',13,'treehouse','F4','the nerf herders',2],
['Game 1','11/15/2015',11,'special wobble','F5','dinosaurs',13],
['Game 1','11/15/2015',3,'Sandy bandits','F6','Shamwow',13],
['Game 1','11/15/2015',10,'no disc, no life','F7','mimosa sunday',13],
['Game 1','11/15/2015',13,'fat unicorn','F8','Elixir',5],
['Game 1','11/15/2015',11,'pppinata','F9','mile high club',8],
['Game 1','11/22/2015',13,'dinosaurs','F1','Shamwow',15],
['Game 1','11/22/2015',13,'dune squad','F2','astronaughty',5],
['Game 1','11/22/2015',15,'honey badgers','F3','penultimate',13],
['Game 1','11/22/2015',10,'aguirre, the wrath of god','F4','mimosa sunday',13],
['Game 1','11/22/2015',13,'special wobble','F5','the nerf herders',1],
['Game 1','11/22/2015',13,'Sandy bandits','F6','Elixir',9],
['Game 1','11/22/2015',13,'treehouse','F7','pppinata',2],
['Game 1','11/22/2015',13,'hammer time','F8','fat unicorn',9],
['Game 1','11/22/2015',5,'no disc, no life','F9','mile high club',13],
['Game 1','12/6/2015',13,'Shamwow','F1','the nerf herders',2],
['Game 1','12/6/2015',13,'dune squad','F2','mimosa sunday',7],
['Game 1','12/6/2015',13,'astronaughty','F3','penultimate',11],
['Game 1','12/6/2015',9,'aguirre, the wrath of god','F4','mile high club',13],
['Game 1','12/6/2015',13,'dinosaurs','F6','Elixir',2],
['Game 1','12/6/2015',9,'Sandy bandits','F7','hammer time',13],
['Game 1','12/6/2015',9,'no disc, no life','F8','treehouse',13],
['Game 1','12/6/2015',7,'honey badgers','F9','fat unicorn',13],
['Game 2','11/8/2015',9,'Sandy bandits','F1','dinosaurs',13],
['Game 2','11/8/2015',13,'dune squad','F2','special wobble',4],
['Game 2','11/8/2015',13,'pppinata','F3','penultimate',6],
['Game 2','11/8/2015',11,'honey badgers','F4','aguirre, the wrath of god',13],
['Game 2','11/8/2015',7,'no disc, no life','F5','astronaughty',13],
['Game 2','11/8/2015',10,'treehouse','F6','Shamwow',13],
['Game 2','11/8/2015',13,'hammer time','F7','mimosa sunday',10],
['Game 2','11/8/2015',13,'fat unicorn','F8','the nerf herders',9],
['Game 2','11/8/2015',13,'mile high club','F9','Elixir',9],
['Game 2','11/15/2015',13,'aguirre, the wrath of god','F1','astronaughty',12],
['Game 2','11/15/2015',11,'dune squad','F2','dinosaurs',13],
['Game 2','11/15/2015',10,'no disc, no life','F3','penultimate',12],
['Game 2','11/15/2015',13,'treehouse','F4','Elixir',2],
['Game 2','11/15/2015',4,'special wobble','F5','Shamwow',13],
['Game 2','11/15/2015',13,'Sandy bandits','F6','the nerf herders',4],
['Game 2','11/15/2015',5,'honey badgers','F7','mimosa sunday',10],
['Game 2','11/15/2015',13,'fat unicorn','F8','pppinata',3],
['Game 2','11/15/2015',11,'hammer time','F9','mile high club',9],
['Game 2','11/22/2015',13,'dinosaurs','F1','the nerf herders',4],
['Game 2','11/22/2015',13,'dune squad','F2','Shamwow',6],
['Game 2','11/22/2015',13,'aguirre, the wrath of god','F3','penultimate',7],
['Game 2','11/22/2015',7,'astronaughty','F4','mimosa sunday',13],
['Game 2','11/22/2015',13,'special wobble','F5','Elixir',7],
['Game 2','11/22/2015',13,'Sandy bandits','F6','pppinata',8],
['Game 2','11/22/2015',13,'treehouse','F7','hammer time',11],
['Game 2','11/22/2015',3,'no disc, no life','F8','fat unicorn',4],
['Game 2','11/22/2015',11,'honey badgers','F9','mile high club',13],
['Game 2','12/6/2015',13,'Shamwow','F1','Elixir',4],
['Game 2','12/6/2015',13,'dune squad','F2','the nerf herders',0],
['Game 2','12/6/2015',13,'mimosa sunday','F3','penultimate',8],
['Game 2','12/6/2015',8,'aguirre, the wrath of god','F4','fat unicorn',13],
['Game 2','12/6/2015',13,'special wobble','F5','hammer time',8],
['Game 2','12/6/2015',4,'astronaughty','F7','mile high club',13],
['Game 2','12/6/2015',13,'Sandy bandits','F8','no disc, no life',7],
['Game 2','12/6/2015',8,'honey badgers','F9','treehouse',13]];

*/