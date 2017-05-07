var http = require("http");
var url = require("url");
var fs = require("fs");
// var item = require("./item");


var token = 123;
var xmlHttpRequest = new XMLHttpRequest(); // constructor httpRequest :  http://xmlhttprequest.ru/

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
            res.statusCode = 500;
            res.end("Server error");
    }

}).listen(3000);

//FIXME token должен вставляться самим пользлвателем эвотор, пока на время сессии

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
