var WebSocket = require('ws');

var ws = new WebSocket('http://fiap-iot.herokuapp.com');

ws.on('open', () => {
    console.log('connected to the server');
});

ws.on('message', (data, flags) => {
    console.log(data);
});