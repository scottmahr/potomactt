//This is for all the configuration we need
var app = angular.module("twc");



//FormState should be all the state variables we will care about
//Anything that is used around app should be here
//There will be other factories that will manipulate this data
app.factory('State', ['$state','$timeout','Globals',
                function($state,$timeout,Globals) {
    //up here are private variables
    var dt = new Date();
    
   
    var fakeScoreline = function(finalScore){
        var scores = [];
        var cScore = [0,0];
        var i = 0;
        while(i<100){
            i++
            scores.push([cScore[0],cScore[1]]);
            if(cScore[0]==finalScore[0] && cScore[1]==finalScore[1]){
                return scores;
            }

            if(cScore[0]==finalScore[0]){
                cScore[1]++;
            }
            else if(cScore[1]==finalScore[1]){
                cScore[0]++;
            }else{
                cScore[_.random(1)]++;
            }
            //console.log(cScore)
            //console.log(scores)

        }

    }

    //console.log(JSON.stringify(fakeScoreline([21,12])))
        
    var playersNames = ['Steve','Scott','Joe','Feeney','James','Tim','Corey','Matt','Gary','Peter','Cedar','Alex','Seth','Jeanine','Andy','AJ','Cubby','Emma','Keegan','Spike','Sam','Mike','Connie','Thies'];

    //now, get the games figured out

    var today = new Date('10-15-2014');
    var tomorrow = new Date(today);
    var gameID = 0;

    //team1,team2,score1,score2,field,game,date




    //console.log('this many games',games.length)

    var service =  {


        tables : ['Garage','Main Room'],
        leagues:[],
        teams: [],
        games: [],

        rawGames:[],

        currentGame: undefined,
        currentLeague: '5637aa91ef0bfb03002ed187',  //this is the ID of the current league

        currentPlayerID:'',


    }

     service.pickGame = function(game){
        service.currentGame = game._id;
        //console.log('going to :',id);
        $state.go('tab.passport');
     }

    service.addTeam = function(name){
        service.teams.push({name:name})
    }

    service.getCurrentGame = function(){
        return _.findWhere(service.games,{'_id':service.currentGame});

    }

    service.getRecord = function(playerID){
        var won=0;
        var lost = 0;
        var tie = 0;
        var pDif = 0;
        _.each(service.games,function(game){
            pDif = game.scores[game.scores.length-1][0]-game.scores[game.scores.length-1][1];
            if(game.player1==playerID && pDif>0){won++;}
            else if(game.player1==playerID && pDif<0){lost++;}
            else if(game.player2==playerID && pDif<0){won++;}
            else if(game.player2==playerID && pDif>0){lost++;}
            else if( (game.player1==playerID || game.player2==playerID) && pDif==0){tie++;}
        })
        return [won,lost,tie];
    }
    service.getWins = function(team){
        return -team.rating;
        var record = service.getRecord(team._id);
        return -record[0]+record[1];
    }

    service.getRecordStr = function(playerID){
        var record = service.getRecord(playerID);
        return record[0]+'-'+record[1]+'-'+record[2];
    }
    

    service.getGames = function(playerID){
        var games = [];

        _.each(service.games,function(game){
            if(game.player1==playerID){
                game.cPlayer = 0;
                games.push(game);
            }else if(game.player2==playerID){
                game.cPlayer = 1;
                games.push(game);
            }
        })
        return games;
    }
   



   
    service.gameX = function(score1,score2){
      var wScore = _.max([score1,score2]);
      var lScore = _.min([score1,score2]);

      var r = lScore/(wScore-1); 
      var x =   125 + 475 * Math.sin(_.min([1,(1-r)/.65])*.4*3.1414)/Math.sin(.4*3.1415);
      //if(x>800){return 800;}
      return parseInt(x);
    }

    service.getPlayerID = function(name){
      name = name.toLowerCase();

      var team = _.findWhere(service.teams,{'name':name});
      if(team){return team._id;}

      var found = '';
      //now see if we have any partial matches
      _.each(service.teams,function(team){
            if(team.name.indexOf(name)!=-1){
                console.log('found match',name)
                found = team._id;
            }
      });

      if(found==''){console.log('error',name);}
      return found;
    }

    service.getPlayerName = function(id){
      var team = _.findWhere(service.teams,{'_id':id});
      if(team){return team.name;}
      //console.log('error',id);
      return '';
    }

    service.getRating = function(id){
      var team = _.findWhere(service.teams,{'_id':id});
      if(_.has(team,'rating')){return team.rating;}
      return 1000;
    }



    service.playGames = function(){
        //console.log('playing games');
        var updatedTeams = _.map(service.teams,function(team){
            //look through all games and get scores for games they played in
            var scores = [];
            var bestGame = [];  //score, opponent(score)
            var worstGame = []; //score, opponent(score)
            var x,opp,score,opponent;

            _.each(service.games,function(g){
              score = g.scores[g.scores.length-1];

              if(!_.has(g,'ratingChange')){g.ratingChange=[0,0];}
              x = undefined;
              
              if(g.player1==team._id || g.player2==team._id){
                //means we are in the game
                opponent = g.player1==team._id ? g.player2 : g.player1;
                if((g.player1==team._id && score[0]>score[1]) || (g.player2==team._id && score[1]>score[0])){
                  //we are the winner
                  opp = opponent+'-Win';
                  x = service.gameX(score[0],score[1]);
                }else{
                  //we are the loser
                  opp = opponent+'-Loss';
                  x = -service.gameX(score[0],score[1]);
                }
                //stuff we do in either case
                rating = service.getRating(opponent)+x;

                //now do the rating change
                if(g.player1==team._id){
                  g.ratingChange[0] = rating-service.getRating(team._id);
                }else{
                  g.ratingChange[1] = rating-service.getRating(team._id);
                }
              }



              if(x!=undefined){
                scores.push(rating);

                if(bestGame.length==0 || rating>bestGame[0]){
                  //new best win
                  bestGame = [rating,opp+'('+score[0]+'-'+score[1]+')'];
                }
                if(worstGame.length==0 || rating<worstGame[0]){
                  //new best win
                  worstGame = [rating,opp+'('+score[0]+'-'+score[1]+')'];
                }

              }


          });

        //console.log(team.name+':'+JSON.stringify(scores));
        var newScore = Globals.myAverage(scores).mean;
        if(scores.length==0){newScore=1000;}
        return {'_id':team._id,'rating':newScore,'bestGame':bestGame,'worstGame':worstGame}
      });

      //now we go through and update the team scores so we can run it again
      _.each(updatedTeams,function(team){
            var t = _.findWhere(service.teams,{'_id':team._id});
            t.rating = team.rating;
            t.bestGame = team.bestGame;
            t.worstGame = team.worstGame;
      })

      //console.log(_.pluck(service.teams,'name'));
      //console.log(_.pluck(service.teams,'rating'));
      //console.log('')
    }



    service.calcSeason = function(){
        console.log('starting calc')
      _.each(_.range(30),function(){service.playGames();});
      service.seassonStatistics();
      var sortedPlayers = _.sortBy(service.teams,'rating').reverse()
      _.each(sortedPlayers,function(p){
        //console.log(JSON.stringify(p));
        //console.log(p.name+':'+parseInt(p.rating)+':'+parseInt(p.sOfs)+':'+p.gamesWon+':'+p.gamesLost+':'+parseInt(p.bestGame[0])+':'+p.bestGame[1]+':'+parseInt(p.worstGame[0])+':'+p.worstGame[1]);
      });
        //console.log(JSON.stringify(players));
    }

    service.seassonStatistics = function(){
      var updatedTeams = _.map(service.teams,function(team){
        //look through all games and get scores for games they played in
        var oppRatings = [];
        var gWon=0,gLost=0;
        var score,opponent;

        _.each(service.games,function(g){
          score = g.scores[g.scores.length-1];
          

          x = undefined;

          if(g.player1==team._id || g.player2==team._id){
            //means we are in the game
            opponent = g.player1==team._id ? g.player2 : g.player1;
            if((g.player1==team._id && score[0]>score[1]) || (g.player2==team._id && score[1]>score[0])){
              //we are the winner
              gWon++;
              opp = opponent+'-Win';
              x = service.gameX(score[0],score[1]);
            }else{
              //we are the loser
              gLost++
              opp = opponent+'-Loss';
              x = -service.gameX(score[0],score[1]);
            }
            //stuff we do in either case
            oppRatings.push(service.getRating(opponent));
            rating = service.getRating(opponent)+x;
          }

        });

        team['sOfs']=Globals.myAverage(oppRatings).mean;
        team['gamesWon']=gWon;
        team['gamesLost']=gLost;

        //console.log(team)


        return team;
      });
      service.teams = updatedTeams;
    }
    


    service.loadGames = function(){
        _.each(Globals.games,function(g,idx){
            //now we look at each game in the day
         
            //console.log(parseInt(idx*90/25),tomorrow)

           
            var game = {
                datePlayed:  new Date(g[6]), 
                leagueID:  '5637aa91ef0bfb03002ed187',
                player1: service.getPlayerID(g[0]), 
                player2: service.getPlayerID(g[1]),
                scores: fakeScoreline([g[2], g[3]]),  //scores [[0,1],[1,2],[2,2],[0,0],[1,1],[2,3]]
                properties: { game:g[5] }, //who served first, anything like that 
                location: g[4]
            };


            service.games.push(game);



            //console.log(g[0]+','+g[1]+','+g[2]+','+g[3]+','+g[0])
            
        });

        console.log(service.games)


    }






    return service;

}]);








   

app.filter('titlecase', function () {
    return function (input) {
      if(!input){return '';}
      var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

      return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
        if (index > 0 && index + match.length !== title.length &&
          match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
          (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
          return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
          return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
      });
    }
  })


app.filter('first', function () {
    return function (input) {
      if(!input){return '';}
      return input.split(' ')[0];
      
    }
  })

app.filter('dt', function () {
    return function (d) {
      if(d instanceof Date){}
      else{
        d = new Date(d);
      }
      

      return (d.getMonth()+1) + "-" +d.getDate()  + "-" +  d.getFullYear();
      
    }
  })

app.filter('int', function () {
    return function (d) {
      
      return parseInt(parseFloat(d));
      
    }
  })



