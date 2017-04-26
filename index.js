var restify   = require('restify'),    
    WebSocket = require('ws');

var TCP_PORT = (process.env.PORT || 5000);

var server = restify.createServer();
var wss = new WebSocket.Server({ server });

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

wss.on('connection', (conn) => {
    //setTimeout(() => { conn.send('keep-alive'), 200} );
    console.log('A new client has connected to the server');
});

/**
 * Broadcasts the event to the connected clients 
 * 
 * @param {*} type 
 * @param {*} data 
 */
function broadcast(type, data) {
    var evt = JSON.stringify({
        evt: type,
        data: data
    });

    wss.clients.forEach((conn) => {
        if (conn.readyState === WebSocket.OPEN)
            conn.send(evt);
    });
}

/**
 * @api {post} /garagem Abre ou fecha o portão da garagem
 * @apiName PostGaragem
 * @apiGroup Garagem
 * 
 * @apiParam {Object} body 'open' para abrir, 'close' para fechar. <br> Ex.: <br> {"gate": "open"}
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiExample {curl} Example:
 * curl -X POST https://fiap-iot.herokuapp.com/v1/garagem -d '{"gate": "open"}'
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/v1/garagem', (req, res, next) => {    
    var json = JSON.parse(req.body);
    broadcast('garagem', {turn: json.turn});
    res.send({success: true});      
});

/**
 * @api {post} /luz Acende ou apaga a luz
 * @apiName PostLuz
 * @apiGroup Luz
 * 
 * @apiParam {Object} body 'on' para acender, 'off' para apagar. <br> Ex.: <br> {"turn": "on"}
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiExample {curl} Example:
 * curl -X POST https://fiap-iot.herokuapp.com/v1/luz -d '{"turn": "on"}'
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/v1/luz', (req, res, next) => {
    var json = JSON.parse(req.body);
    broadcast('luz', {turn: json.turn});
    res.send({success: true});      
});

/**
 * @api {get} /temperatura Verifica temperatura do ambiente
 * @apiName GetTemperatura
 * @apiGroup Temperatura
 *  
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiExample {curl} Example:
 * curl https://fiap-iot.herokuapp.com/v1/temperatura
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.get('/v1/temperatura', (req, res, next) => {
    res.send({success: true});      
});

/**
 * @api {post} /ar-condicionado Controle de temperatura do ar condicionado
 * @apiName PostArCondicionado
 * @apiGroup ArCondicionado
 * 
 * @apiParam {Object} body Número inteiro representando a temperatura <br> Ex.: <br> {"degrees": 20}
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiExample {curl} Example:
 *  curl -X POST https://fiap-iot.herokuapp.com/v1/ar-condicionado -d '{"degrees": 20}'
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/v1/ar-condicionado', (req, res, next) => {
    var json = JSON.parse(req.body);
    broadcast('ar-condicionado', {turn: json.turn});
    res.send({success: true});    
});

/**
 * @api {post} /sensor Controle de sensor
 * @apiName PostSensor
 * @apiGroup Sensor
 * 
 * @apiParam {Object} body 'on' para ligar, 'off' para desligar. <br> Ex.: <br> {"turn": "off"} 
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiExample {curl} Example:
 * curl -X POST https://fiap-iot.herokuapp.com/v1/sensor -d '{"turn": "on"}'
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/v1/sensor', (req, res, next) => {
    var json = JSON.parse(req.body);
    broadcast('sensor', {turn: json.turn});
    res.send({success: true});    
});

/* serving static documentation */
server.get(/\/?.*/, restify.serveStatic({
	'directory': './docs',
	'default': 'index.html'
}));

server.listen(TCP_PORT, () => {
    console.log('Server is up and running!');
});