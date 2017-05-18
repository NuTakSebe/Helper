// Обращение просто к token для его получения.
// let keys= {};
function getToken(){
  let params = window.location.search.replace('?','');
  let token = "";

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

  return token;
}
