var http = require("http");
var url = require("url");
var fs = require("fs");
var item = require("./item");


var token = 123;
var xmlHttpRequest = new XMLHttpRequest(); // constructor httpRequest :  http://xmlhttprequest.ru/


/**
 * Создает сервер, слушающий порт 3000, далее будет заменен на sys.PORT
 *
 * 3 url и дефолтный метод
 *
 * "/add" будет произведено обращение на этот путь в случае добавления товара, в этом случае в методе у item.js
 *  уже должны быть считаны поля с клиента, которые в последствии будут вставлены в методе у item.js
 *
 * "/remove" удаление любого продукта, поле считывается с клиента  и предается в item.js
 *
 * "/change" редактирование товара, на клиенте считывается конкретный товар в конкретном магазине, передается в метод item.js
 *
 * по дефолту ошибка либо сервера, либо не найдено
 **/
http.createServer(function (req, res) {
    console.log("Request arrived");
    switch (req.url) {

        case "/add":
            //TODO https://api.evotor.ru/api/v1/inventories/stores/{storeUuid}/products
            var request = "https://api.evotor.ru/api/v1/inventories/stores/" + getStoreUUID(1,res) + "/products";
            xht.open("GET",request, true);
            xmlHttpRequest.setHeader("X-Authorization",token);
            break;
        case "/remove":
            //....//
            break;
        case "/change":
            //....//
            break;

        default:
            res.statusCode = 404;
            res.end("Not Found");
    }

}).listen(3000);

//FIXME token должен вставляться самим пользлвателем эвотор, пока на время сессии


// ХЗ работает нет, но вроде как составляем запрос С УЖЕ ПОЛУЧЕННЫМ ТОКЕНОМ!!!!! (РАЗОБРАТЬСЯКАКСДЕЛАТЬНОРМАЛЬНО)
// слушаем ответ облака, все в асинхроне, чтоб не завалить сервак, и не заставлять пользователей ждать
// Далее получаем ответ, с кодом 4 (эквивалент 200, т.е все ок) парсим ответ в JSON, так как он приходит в виде текста
// обращаемся как к массиву по номеру (магазина) , который указал сам юзер, (ВОЗМОЖНО его надо будет подредактировать, так как нам не упал uuid,
// если он будет выбирать из уже выпавшего списка магазинов, где есть все uuid

function getStoreUUID(num,res) {
    //TODO https://api.evotor.ru/api/v1/inventories/stores/search
    xmlHttpRequest.open("GET", "https://api.evotor.ru/api/v1/inventories/stores/search", true);
    xmlHttpRequest.setHeader(token);
    xmlHttpRequest.push(null);

    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState !== 4) {
            console.error("Some error during receiving stores");
            res.statusCode = 500;
            res.end("Server internal error");
            return null;
        }
        if (xmlHttpRequest.status === 200) {
            var response = JSON.parse(xmlHttpRequest.responseText);
            return response[num].uuid;
        }
        xmlHttpRequest.send(null);
    }
}
