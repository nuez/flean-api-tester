
var a = new XMLHttpRequest();
var b = new XMLHttpRequest();

function refresh() {
  var client_id = document.getElementById('api_key').value;
  var client_secret = document.getElementById('password').value;
  var base = document.getElementById('base').value;
  var request_uri = document.getElementById('request_uri').value;

  console.log(base);

  document.getElementById('request').innerHTML = base + request_uri;

  a.open('POST', base + '/oauth/token', true);

  var data = new FormData();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', client_id);
  data.append('client_secret', client_secret);
  data.append('scope', 'data_analyst');

  a.send(data);
  a.onload = function () {
    var token = JSON.parse(a.responseText);
    if (token.error != undefined) {
      document.getElementById('token').innerHTML = 'Could not fetch token';
      document.getElementById('result').innerHTML = '';
      return;
    } else {
      document.getElementById('token').innerHTML = 'Token: ' + token.access_token;
      b.open('GET', base + request_uri, true);
      b.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
      b.send(null);
      b.onload = function () {
        const prettyJSON = JSON.stringify(JSON.parse(b.responseText), null, 2);
        document.getElementById('result').innerHTML = prettyJSON;
      }
    }
  }
}