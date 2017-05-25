// node js  $ npm install node-excel-to-json
var excel2Json = require("excel2Json");
var jsonObjectTest = null;

excel2Json(fileName, {
  'convert_all_sheet': true,
  'return_type': 'Object'
}, function (err, output) {
  if (err) {
    console.log("An error appear!")
    return;
  }
  jsonObjectTest = output;
})
module.exports = jsonObjectTest;

console.log("Json parsed" + jsonObjectTest);
