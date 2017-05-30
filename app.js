var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  log = require("./libs/log")(module),
  request = require('request'),
  fs = require('fs');
  const url = require('url');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //установка для .ejs движка ejs
app.use(bodyParser.json()); // from json разбирает тело запроса
app.use(bodyParser.urlencoded({
  extended: false
})); // url encoder
app.use(cookieParser()); // кукиши
app.use(express.static(path.join(__dirname, 'public'))); // статик, если middlewar все бум

if (app.get("env") === 'development') {
  app.use(logger('dev')); // log development
} else {
  app.use(logger('default')); // стандартный
}

app.listen(config.get("port") || process.env.PORT, function() {
  //log.info("Server started");
  console.log("Server started"); // Хрень
});

app.use('/assets', express.static('assets')); // redirect our CSS
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/assets/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/assets/js', express.static(__dirname + '/node_modules/tether/dist/js')); // redirect JS Tether

app.use('/assets/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')); // redirect Font Awesome Fonts
app.use('/assets/css', express.static(__dirname + '/node_modules/font-awesome/css')); // redirect Font Awesome CSS

// our paths
app.get('/', function(req, res, next) {
  console.log(req.query);
  res.render('index', {
    qs: req.query
  });
});

app.get('/addItem', function(req, res, next) {
  res.render('addItem', {
    qs: req.query
  });
});


app.get('/editItem', function(req, res, next) {
  res.render('editItem', {
    qs: req.query
  });
});

app.get('/excel', function(req, res, next) {
  res.render('parser');
});

app.post("/excel/upload", function(req, res, next) {
  console.log("Request Arrived");
  let length = 0;
  let file = null;
  req.on("data", function(data) {
      if (data !== null) {
        if (file === null) file = data;
        else file+=data;
      }
      length += data.length;
      console.log("length : " + length);
    })
    .on("end", function() {
      console.log(file);
      console.log("Data Fully Arrived");
    })
    .on("error", function(error) {
      console.log(error.toString());
    });
});

app.post("/excel/download", function(req, res){
  console.log("Request Arrived");
  console.log("Sending file");
  query = url.parse(req.url,true);
  console.log(query.query.for)
  let file;
  if(query.query.for==="xlsx") {
    file = __dirname + '/files/template.xlsx';
  }else {
    file = __dirname + '/files/temp.xls';
  }

  res.download(file); // Set disposition and send it.
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //TODO переобозначить функцию на тесте и на продакшене
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
