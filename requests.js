let https =require("https");
let url = require("url");
let log = require("libs/log")(module);
//EXAMPLE of request to Evotor Cloud

// request('http://www.google.com', function (error, response, body) {
//     log.info('error:', error); // Print the error if one occurred
//     log.info('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     log.info('body:', body); // Print the HTML for the Google homepage.
// });

module.exports = function getItemsFromStore(storeUuid, token) {
    let reqString = "/api/v1/inventories/stores/"+storeUuid+"/products";
    const options = {
        hostname: "api.evotor.ru",
        path: reqString,
        method: 'GET',
        headers: {"X-Authorization" : token }
    };
    let response  = "";

    https.request(options, (res) => {

        res.on("data", (data) => {
            if (data !== null) {
                response += data;
            }else {
                log.error("Null data: getItemsFromStore");
                throw 500;
            }
            if (data === "") {
                log.error("Data didn't arrive: getItemsFromStore");
                throw 500;
            }
        });

        res.on("error", (error) => {
            log.log(error + " : getItemsFromStore");
        });

    });

    return null;
};