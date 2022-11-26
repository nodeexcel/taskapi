module.exports = function() {
    var mongoose = require('mongoose');
    var http = require('http');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    mongoose.Promise = global.Promise;
    var conn = mongoose.connect('mongodb://ashutosh_m:java123@ds249025.mlab.com:49025/task_api');
    var user_details = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }, {
        collection: 'registered_users',
        strict: true
    });
    var task = mongoose.Schema({
        task: { type: String },
        date: { type: Date, required: true },
        status: { type: Boolean, default: false },
        users_id: [{
            id: String
        }]
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