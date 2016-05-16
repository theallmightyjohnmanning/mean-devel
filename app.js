// Include the environment.json configuration file
var fs          = require('fs');
var config      = JSON.parse(fs.readFileSync("environment.json"));

// Instantiate database connection
var mongoose    = require('mongoose');
var db          = mongoose.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name);

// Instantiate express
var express     = require('express');
var app         = express();

// Instantiate body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Setup included directories
app.use(express.static(__dirname+'/node_modules'));
app.use(express.static(__dirname+'/public'));

// Setup available models
require('./models')(db);

// Include Routes
require('./routes');

// Start server
app.listen(config.server.port, config.server.host);
