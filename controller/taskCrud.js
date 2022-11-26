const validation = require("../middleware/validation");

exports.addTask = function (req, res, next) {
    validation.validateAccess(req, function (err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            validation.validate_task(req.body, function (err, data) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    var users_id = [];
                    users_id.push({
                        id: access_token_data.user_id
                    })
                    var task_details = new req.get_task({
                        users_id: users_id,
                        task: data.task,
                        date: data.date
                    })
                    task_details.save(function (err, data) {
                        if (err) {
                            res.status(400).json(err.message);
                        } else
                            res.json({ error: 0, message: "data inserted", data: data })
                    })
                }
            })
        }
    })
}

exports.deleteTask = function (req, res, next) {
    var id = req.headers.task_id;
    validation.validateAccess(req, function (err, data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.findOne({ _id: req.headers.task_id }, function (err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    req.get_task.remove({ "_id": data._id }, function (err, result) {
                        if (err) {
                            next(err);
                        } else {
                            res.json({ error: 0, message: "data deleted", data: data });
                        }
                    });
                } else {
                    res.json({ error: 0, message: "data not found", data: data });
                }
            });
        }
    });
}


exports.editTask = function (req, res, next) {
    validation.validateAccess(req, function (err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            validation.validate_task(req.body, function (err, data) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    req.get_task.update({ _id: req.headers.task_id }, { $set: { task: req.body.task } }, function (err, result) {
                        if (err) {
                            next(err);
                        } else {
                            req.get_task.find({ _id: req.headers.task_id }, function (err, data) {
                                res.json({ error: 0, message: "task updated", data: data });
                            });
                        }
                    })
                }
            })
        }
    })
}

exports.viewAllTask = function (req, res, next) {
    validation.validateAccess(req, function (err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.find({ users_id: { "$elemMatch": { "id": access_token_data.user_id } } }).exec(function (err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    res.json({ error: 0, message: "all tasks", data: data });
                }
            })
        }
    })
}
