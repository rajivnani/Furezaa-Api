var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');

path = require('path');
appRoot = __dirname;


app.use(useragent.express());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(logErrors);
app.use('/nodeapp', require('./routes/routes'));

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

app.get('/', function (req, res) {
    res.send("velumuri infra API Server");
});
var sch = require('./utils/schedules');
sch.scheduleScripts(function (err) {
    //console.log("Scheduled");
});
var server = app.listen(1665, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('velumuri infra  Server is listening at http://%s:%s', host, port);
});
