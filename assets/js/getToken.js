// Обращение просто к token для его получения.
// let keys= {};
let params = window.location.search.replace('?','');
let token = null;

params.split('&').forEach(function(item) {
    item = item.split('=');
    if (item[0] === 'token') {
        token = item[1];
    }
});

console.log(token);

if (token === null) {
    console.error("Token is null!");
}