//require express

var express = require('express')

//define app as in instance of express

var app = express()

//require body-parser

var bodyParser = require('body-parser')



//use bodyparser as a middle ware

app.use(bodyParser.json())



//ably realtime

const ably = require('ably').Realtime;

const pj_private_key = "g7DAeg.GFwDeQ:rxTuVBACO9oJ7df-";
const be_private_key = "apmzRA.ZnRikg:DamL7hYfPUParcyz";

const ablyRealtime = new ably(pj_private_key);

const channel = ablyRealtime.channels.get('ably-chat');



//set cors middleware

app.use((req, res, next)=> {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});

//handle sending of message via ably

app.post('/send_message', (req, res)=> {

    var data = {

        user: req.body.name,

        msg: req.body.msg,

        action: req.body.action

    }

    channel.publish('data', data, (err)=> {

        if (err) {
            console.log('publish failed with error ' + err);
        } else {
            console.log('publish succeeded ' + data.msg);
        }

    })

    res.send({ status: 'okay', data: data });



});



//listen on port and serve the app

app.listen(3000, ()=> {

    console.log('Example app listening on port 3000!');

});
