var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db.js')
var routes = require('./routes/index.js');
var cors = require('cors');
app.use(db())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors());
app.use('/', routes);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    if (err) {
        res.status(500).json({ error: err });
    }
}
app.listen(6001, function() {
    console.log("Server started at port number: 6001");
});