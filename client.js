var unirest = require('unirest');
var WebSocket = require('ws');

var ws = new WebSocket('wss://fiap-iot.herokuapp.com');

ws.on('open', () => {
    setTimeout(() => { ws.send('keep-alive'), 200} );
    console.log('connected to the server');
});

ws.on('message', (data, flags) => {

    if (data === 'keep-alive')
        return;

   var json = JSON.parse(data);   
   if (json.evt === 'luz') 
       unirest.get('http://localhost:1880/1').end( (response) => {
           console.log(response.body);
       })

});