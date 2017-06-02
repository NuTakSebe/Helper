const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const url = require('url');
const app = express();

// Получаем роуты API нашего сервера
const api = require('./server/routes/api');

// Парсеры для POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Статичный путь до дистрибутива Angular
app.use(express.static(path.join(__dirname, 'dist')));

// Роут к API нашего сервера
app.use('/api', api);

// Все остальные запросы перенаправляем к Angular, дальше он сам разберётся
app.get('*', (req, res) => {
  res.end("Hi")
});

app.post("/excel/upload", function(req, res, next) {
  res.end("Hi")

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
    file = __dirname + '/server/files/template.xlsx';
  }else {
    file = __dirname + '/server/files/temp.xls';
  }

  res.download(file); // Set disposition and send it.
});


// собственно сервер
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
