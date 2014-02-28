
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./app/controllers');
var region = require('./app/controllers/region');
var country = require('./app/controllers/country');
var university = require('./app/controllers/university');
var issue = require('./app/controllers/issue');
var author = require('./app/controllers/author');


var http = require('http');
var path = require('path');
var config = require('./app/config');





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


app.post('/region/read', region.read);
app.post('/region/new', region.create);
app.post('/region/delete', region.delete);
app.post('/region/update', region.update);
app.post('/region/list', region.list);

app.get('/region', region.show);

app.post('/country/read', country.read);
app.post('/country/read:region', country.read);
app.post('/country/new', country.create);
app.post('/country/delete', country.delete);
app.post('/country/update', country.update);
app.post('/country/list', country.list);

app.get('/country', country.show);

app.get('/university/read', university.read);

app.post('/university/new', university.create);
app.post('/university/delete', university.delete);
app.post('/university/update', university.update);
app.post('/university/list', university.list);
app.post('/university/list/:country', university.list);

app.get('/university', university.show);

app.post('/issue/read', issue.read);
app.post('/issue/new', issue.create);
app.post('/issue/delete', issue.delete);
app.post('/issue/update', issue.update);
//app.post('/issue/list', university.list);

app.get('/issue', issue.show);


app.post('/author/read', author.read);
app.post('/author/new', author.create);
app.post('/author/delete', author.delete);
app.post('/author/update', author.update);
//app.post('/issue/list', university.list);

app.get('/author', author.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
