
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



var userSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    name: {type: String, lowercase: true, trim: true,required:true,unique:true},                    
    facebookID: String,
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
    date:  { type: String},  //a string of the game date
    time: { type: String},  //what time the game is scheduled for
    player1: mongoose.Schema.Types.ObjectId, 
    player2: mongoose.Schema.Types.ObjectId,
    round: Number,  //round of games
    writeup: String,
    scores: { type: mongoose.Schema.Types.Mixed , default: [] },  //scores [[0,1,1,2,2,2],[0,0,1,1,2,3]]
    finalScore: { type: mongoose.Schema.Types.Mixed , default: [] }, //[15,10]
    table: String, //table 1, table 2

    
}, { versionKey: false });


var Users = mongoose.model('pttUsers', userSchema);
var Games = mongoose.model('pttGames', gameSchema);

// In case the browser connects before the database is connected, the
// user will see this message.
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


// on routes that end in /users
// ----------------------------------------------------
router.route('/users')
    .post(function(req, res) {
        new Users(req.body).save(function(err,user) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(user);
            }
        });
    })

    .get(function(req, res) {


        
        Users.find(function(err, users) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(users);
            }
        });

    });

router.route('/users/:user_id')

    // get the review with that id
    .get(function(req, res) {
        Users.findById(req.params.user_id, function(err, user) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(user);
            }
        });
    })
    // update the user with this id
    .put(function(req, res) {
        Users.findById(req.params.user_id, function(err, user) {
            if (err){
                res.json({ error: err });
            }
            _.extend(user,req.body).save(function(err,user) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(user);
                }
            });

        });
    })
        //delete user
    .delete(function(req, res) {
        //first, get the user and see if it has any reviews
        Users.findById(req.params.user_id, function(err, user) {
            if (err){
                res.json({ error: 'error getting user: ' +err });
            }else{
                Users.remove( {_id: user._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing lift: ' +err });
                        }else{
                            res.json({ sucess: 'removed user' });
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

