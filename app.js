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
        res.status(error.status).json({ error: error });
    } else {
        console.log(error)
        res.status(500).json({ error })
    }
}
var port = process.env.PORT || 6001;
app.listen(port, function() {
    console.log("App is running on port " + port);
});