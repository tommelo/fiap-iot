var restify   = require('restify'),
    WebSocket = require('ws');

var REST_PORT = 3000;
var WS_PORT   = 3001;

var wss = new WebSocket.Server({ port: WS_PORT });
var server = restify.createServer();

wss.on('connection', (conn) => {
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
 * @apiParam {Object} gate 'open' para abrir, 'close' para fechar
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/garagem', (req, res, next) => {    
    broadcast('garagem', {gate: req.gate});
    res.send({success: true});      
});

/**
 * @api {post} /luz Acende ou apaga a luz
 * @apiName PostLuz
 * @apiGroup Luz
 * 
 * @apiParam {Object} turn 'on' para acender, 'off' para apagar
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/luz', (req, res, next) => {
    broadcast('luz', {turn: req.turn});
    res.send({success: true});      
});

/**
 * @api {get} /temperatura Verifica temperatura do ambiente
 * @apiName GetTemperatura
 * @apiGroup Temperatura
 *  
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.get('/temperatura', (req, res, next) => {
    res.send({success: true});      
});

/**
 * @api {post} /ar-condicionado Controle de temperatura do ar condicionado
 * @apiName PostArCondicionado
 * @apiGroup ArCondicionado
 * 
 * @apiParam {Object} degrees Número inteiro representando a temperatura
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/ar-condicionado', (req, res, next) => {
    broadcast('ar-condicionado', {degrees: req.degrees});
    res.send({success: true});    
});

/**
 * @api {post} /sensor Controle de sensor
 * @apiName PostSensor
 * @apiGroup Sensor
 * 
 * @apiParam {Object} turn 'on' para acender, 'off' para apagar
 * @apiSuccess {Object} success Status da operação
 * 
 * @apiSuccessExample Success-Response:
 * Http/1.1 200 OK
 * {
 *   success: true
 * }
 */
server.post('/sensor', (req, res, next) => {
    broadcast('sensor', {turn: req.turn});
    res.send({success: true});    
});

server.listen(REST_PORT, () => {
    console.log('Server is up and running!');
});