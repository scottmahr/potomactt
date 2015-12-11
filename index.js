
var http = require ('http');	     // For serving a basic web page.
var querystring = require('querystring');
var _ = require('underscore');
var mongoose = require ("mongoose"); // The reason for this demo.
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Grid = require('gridfs-stream');
var app = express();
var fs = require('fs');


app.use(cors());
app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '50mb',
  extended: true
}));



// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/test';



// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;
var gfs = Grid(conn.db);

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//5637aa91ef0bfb03002ed187 beach
//5637aac1ef0bfb03002ed188  ping pong


var leagueSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    name: {type: String, lowercase: true, trim: true,required:true,unique:true},
    type:  String,  //the type of league, right now, ping pong, frisbee                    
    photoID: String,
    email:{
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    
}, { versionKey: false });

var teamSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    name: {type: String, lowercase: true, trim: true,required:true,unique:true},                    
    facebookID: String,
    leagueID:  mongoose.Schema.Types.ObjectId,
    photoID: String,
    phoneNumber: String,
    email:{
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    
}, { versionKey: false });

var gameSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    datePlayed:  { type: String},  //a string of the game date
    leagueID:  mongoose.Schema.Types.ObjectId,
    time: { type: String},  //what time the game is scheduled for
    player1: mongoose.Schema.Types.ObjectId, 
    player2: mongoose.Schema.Types.ObjectId,
    round: Number,  //round of games
    writeup: String,
    scores: { type: mongoose.Schema.Types.Mixed , default: [] },  //scores [[0,1],[1,2],[2,2],[0,0],[1,1],[2,3]]
    properties: { type: mongoose.Schema.Types.Mixed , default: {} }, //who served first, anything like that 
    location: String, //table 1, table 2, field 3, field 4

    
}, { versionKey: false });

//gameSchema.index({ datePlayed: 1, player1: 1,player2:1 }, { unique: true });

var Leagues = mongoose.model('pttLeagues', leagueSchema);
var Teams = mongoose.model('pttTeams', teamSchema);
var Games = mongoose.model('pttGames', gameSchema);

// In case the browser connects before the database is connected, the
// team will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

app.get('/', function(req, res){
  res.redirect('/index.html');
  //res.send('our home');
});


app.use(express.static(__dirname + '/public'));



router.get('/', function(req, res) {
    res.json({ success: 'hooray! welcome to our api!' });   
});

// ----------------------------------------------------
router.get('/image', function(req, res) {
    //read from mongodb
    console.log("yep:"+req.query.id)
    if(!!req.query.id){
        var readstream = gfs.createReadStream({
            _id: req.query.id
        });

        readstream.on('error', function (err) {
          console.log('An error occurred!', err);
          throw err;
        });

        readstream.pipe(res);
    }
    
});

router.post('/loadImage', function(req, res) {
  if( req==undefined){
    res.json({ status: 'No Image' });
  }else{
    var writestream = gfs.createWriteStream({});
    req.pipe(writestream);
    writestream.on('close', function (file) {
        // do something with `file`
        console.log('Written To gridfs:'+file._id);
        res.json({ status: 'Saved',id:file._id });
    });
  }
});


// on routes that end in /teams
// ----------------------------------------------------
router.route('/teams')
    .post(function(req, res) {
        new Teams(req.body).save(function(err,team) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(team);
            }
        });
    })

    .get(function(req, res) {


        
        Teams.find(function(err, teams) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(teams);
            }
        });

    });

router.route('/teams/:team_id')

    // get the review with that id
    .get(function(req, res) {
        Teams.findById(req.params.team_id, function(err, team) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(team);
            }
        });
    })
    // update the team with this id
    .put(function(req, res) {
        Teams.findById(req.params.team_id, function(err, team) {
            if (err){
                res.json({ error: err });
            }
            _.extend(team,req.body).save(function(err,team) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(team);
                }
            });

        });
    })
        //delete team
    .delete(function(req, res) {
        //first, get the team and see if it has any reviews
        Teams.findById(req.params.team_id, function(err, team) {
            if (err){
                res.json({ error: 'error getting team: ' +err });
            }else{
                Teams.remove( {_id: team._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing team: ' +err });
                        }else{
                            res.json({ sucess: 'removed team' });
                        }
                    }
                );
                
            }
        });
    })

// on routes that end in /leagues
// ----------------------------------------------------
router.route('/leagues')
    .post(function(req, res) {
        new Leagues(req.body).save(function(err,league) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(league);
            }
        });
    })

    .get(function(req, res) {


        
        Leagues.find(function(err, leagues) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(leagues);
            }
        });

    });

router.route('/leagues/:league_id')

    // get the review with that id
    .get(function(req, res) {
        Leagues.findById(req.params.league_id, function(err, league) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(league);
            }
        });
    })
    // update the league with this id
    .put(function(req, res) {
        Leagues.findById(req.params.league_id, function(err, league) {
            if (err){
                res.json({ error: err });
            }
            _.extend(league,req.body).save(function(err,league) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(league);
                }
            });

        });
    })
        //delete league
    .delete(function(req, res) {
        //first, get the league and see if it has any reviews
        Leagues.findById(req.params.league_id, function(err, league) {
            if (err){
                res.json({ error: 'error getting league: ' +err });
            }else{
                Leagues.remove( {_id: league._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing league: ' +err });
                        }else{
                            res.json({ sucess: 'removed league' });
                        }
                    }
                );
                
            }
        });
    })

// on routes that end in /games
// ----------------------------------------------------
router.route('/games')
    .post(function(req, res) {
        new Games(req.body).save(function(err,game) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(game);
            }
        });
    })

    .get(function(req, res) {
        Games.find(function(err, games) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(games);
            }
        });
    });

router.route('/games/:game_id')

    // get the review with that id
    .get(function(req, res) {
        Games.findById(req.params.game_id, function(err, game) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(game);
            }
        });
    })
    // update the game with this id
    .put(function(req, res) {
        Games.findById(req.params.game_id, function(err, game) {
            if (err){
                res.json({ error: err });
            }
            _.extend(game,req.body).save(function(err,game) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(game);
                }
            });

        });
    })
        //delete game
    .delete(function(req, res) {
        //first, get the game and see if it has any reviews
        Games.findById(req.params.game_id, function(err, game) {
            if (err){
                res.json({ error: 'error getting game: ' +err });
            }else{
                Games.remove( {_id: game._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing lift: ' +err });
                        }else{
                            res.json({ sucess: 'removed game' });
                        }
                    }
                );
                
            }
        });
    })


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

app.listen(theport);



// Tell the console we're getting ready.
// The listener in http.createServer should still be active after these messages are emitted.
console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');

