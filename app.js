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
app.use(express.static(__dirname+'/controllers'));
app.use(express.static(__dirname+'/public'));

// Setup available models
fs.readdirSync(__dirname+'/models').forEach(function(filename) {
  if(~filename.indexOf('.js')) {
    require(__dirname+'/models/'+filename)(db);
  }
});

// Include Routes
fs.readdirSync(__dirname+'/routes').forEach(function(filename) {
  if(~filename.indexOf('.js')) {
    require(__dirname+'/routes/'+filename)(app);
  }
});

// Start server
app.listen(config.server.port, config.server.host);
