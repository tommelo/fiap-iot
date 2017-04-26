var unirest = require('unirest');
var WebSocket = require('ws');

var ws = new WebSocket('ws://ec2-52-91-183-133.compute-1.amazonaws.com:5000');

var routes = {
    
    'luz': {
        'on': '/1',
        'off': '/2'
    },

    'ar-condicionado': {
        'on': '/4',
        'off': '/5'
    },

    'sensor': {
        'on': '/6',
        'off': '/7'
    },

    'garagem': {
        'on': '/8',
        'off': '/9'
    }

}

ws.on('open', () => {
    //setTimeout(() => { ws.send('keep-alive'), 200} );
    console.log('connected to the server');
});

ws.on('message', (data, flags) => {

    if (data === 'keep-alive')
        return;

    var json = JSON.parse(data);   
    
    console.log(json.evt);
    console.log(json.data.turn);

    var resource = routes[json.evt][json.data.turn];
    var endpoint = 'http://localhost:1880' + resource;

    console.log(endpoint);

    unirest.get(endpoint).end( (response) => {
        console.log(response.body);
    });

});