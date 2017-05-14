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



var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');                      //установка для .ejs движка ejs
app.use(bodyParser.json());                 // from json разбирает тело запроса
app.use(bodyParser.urlencoded({ extended: false }));    // url encoder
app.use(cookieParser());                                   // кукиши
app.use(express.static(path.join(__dirname, 'public')));    // статик, если middlewar все бум

if (app.get("env") === 'development') {
    app.use(logger('dev'));                 // log development
}else {
    app.use(logger('default'));             // стандартный
}


app.listen(config.get("port"), function () {
    //log.info("Server started");
    console.log("Server started"); // Хрень
});

app.use('/assets', express.static('assets')); // redirect our CSS
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/assets/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/assets/js', express.static(__dirname + '/node_modules/tether/dist/js')); // redirect JS Tether


// our paths
app.get('/', function (req, res, next) {

    res.render('index');

});


app.get('/add', function (req, res, next) {

    res.render('add');

});


app.get('/change', function (req, res, next) {

   res.render('change');

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


//Additional

function sendFile(fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on("error",function () {
            res.statusCode = 404;
            res.end("Not Found");
        })
        .pipe(res)
        .on("close", function () {
            fileStream.destroy();
        })

}


module.exports = app;
