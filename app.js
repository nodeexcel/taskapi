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

function errorHandler(error, req, res, next) {
    if (error.status) {
        res.status(error.status).json({ error: error});
    }else{
    	res.status(500).json({error})
    }
}
app.listen(6001, function() {
    console.log("Server started at port number: 6001");
});