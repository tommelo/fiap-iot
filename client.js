var unirest = require('unirest');
var WebSocket = require('ws');

var ws = new WebSocket('http://fiap-iot.herokuapp.com');

ws.on('open', () => {
    console.log('connected to the server');
});

ws.on('message', (data, flags) => {

   var json = JSON.parse(data);   
   if (json.evt === 'luz') 
       unirest.get('http://localhost:1880/1').end( (response) => {
           console.log(response.body);
       })

});