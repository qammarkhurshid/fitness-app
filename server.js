var app = require('express')();
var mongoose = require('mongoose');
var morgan = require('morgan');
var WebSocket = require('ws');
var bodyParser = require('body-parser');

var validtor = require('./validator-service.js');
var stepservice = require('./step-service.js');

mongoose.Promise = global.Promise;



var port = process.env.PORT || 1339;


mongoose.connect('mongodb://fitness:fitness@ec2-34-216-156-161.us-west-2.compute.amazonaws.com:27017/fitness-db',
    { poolSize: 20, keepAlive: 300000, useNewUrlParser: true, useUnifiedTopology: true });

mongoose
    .connection
    .once('connected', () => console.log('Connected to database'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const wss = new WebSocket.Server({ port: 8080 });



wss.on('connection', async function connection(ws) {
    console.log('in connection');

    ws.on('message', async function incoming(message) {
        var jsonObj = JSON.parse(message);
        var isValid = validtor.validate(jsonObj);
        console.log(isValid);
        if (!isValid) {
            ws.send('invalid');
        } else {
            await stepservice.add(jsonObj.username, parseInt(jsonObj.ts), jsonObj.update_id, jsonObj.newSteps);
            console.log('updated', await stepservice.get(jsonObj.username));
            ws.send('success');
        }
    });

});

// Get number of steps
app.get('/users/:username/steps', async (req, res) => {
    try {
        var result = await stepservice.get(req.params.username);
        if (!result) {
            return res.status(404).send({ "error": "User doesn't exist" })
        }
        if (result.length === 0) {
            return res.status(404).send({ "error": "User doesn't exist" })
        }
        else {
            return res.status(200).send(result[0]);
        }

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

// add steps
app.post('/users/:username/steps', async (req, res) => {
    console.log(req.body);

    try {
        var message = {
            username: req.params.username,
            ts: parseInt(req.body.ts),
            update_id: req.body.update_id,
            newSteps: req.body.newSteps
        }
        const isValid = validtor.validate(message);
        if (isValid) {
            var result = await stepservice.add(req.params.username, parseInt(req.body.ts), req.body.update_id, req.body.newSteps);
            if (!result) {
                return res.status(404).send({ "error": "User doesn't exist" })
            }
            else {
                return res.status(200).send({ success: true });
            }
        } else {
            throw new Error('invalid object');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
})

/****************************************************************************************************************************************** */

app.listen(port, function () {
    console.log('listening on *:', port);
});
