const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

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
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// собственно сервер
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
