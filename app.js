var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//middleware that lets you process incoming values
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// instantiating the main controller "app"
var app = express();

// simple in-memory usage store
var usages = [];
app.usages = usages;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Icon from https://www.flaticon.com/free-icon/light-bulb-idea_10890#term=thinking&page=1&position=94
app.use(favicon(path.join(__dirname, 'public', 'me_right_now_only_more_anxious.ico')));

// setting up loggers
app.use(logger('dev'));
// setting up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting up directory for pages?
app.use('/', index);
app.use('/users', users);

// API
require('./routes/api/usages')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //I never know how to feel about ternary operators, but it's nice to know they're used elsewhere.
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
