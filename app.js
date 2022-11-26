var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require("./model/db")
var routes = require('./routes');
var cors = require('cors');
var errorHandler = require("./utils/Errors");
app.use(db())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes);
app.use(errorHandler);
var port = process.env.PORT || 6001;
app.listen(port, function () {
    console.log("App is running on port " + port);
});