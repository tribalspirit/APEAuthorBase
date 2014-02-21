
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./app/controllers');
var region = require('./app/controllers/region');

var http = require('http');
var path = require('path');
var config = require('./app/config');

var RegionModel  = require('./app/models/mongoose').RegionModel;



var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secretapescrapeshisballs'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/user', user.list(db));

app.post('/region', region.read);
app.post('/region/new', region.create);
app.post('/region/delete', region.delete);
app.post('/region/update', region.update)

app.get('/regions', region.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
