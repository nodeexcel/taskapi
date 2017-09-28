module.exports = function() {
    var mongoose = require('mongoose');
    var http = require('http');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    mongoose.Promise = global.Promise;
    var conn = mongoose.connect('mongodb://localhost/task_api_db');
    var user_details = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }, {
        collection: 'registered_users',
        strict: true
    });
    var task = mongoose.Schema({
        task: { type: String },
        date: { type: Date, required: true }
    }, {
        collection: 'task_collection',
        strict: true
    });
    var user_data = conn.model("user_data", user_details);
    var task_data = conn.model("task_data", task);
    return function(req, res, next) {
        req.register_user = user_data;
        req.get_task = task_data;
        next();
    }
}