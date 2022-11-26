const validation = require("../middleware/validation");


exports.getTaskStatus = function (req, res, next) {
    validation.validateAccess(req, function (err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.findOne({ _id: req.headers.task_id }, function (err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    if (data.status == false) {
                        req.get_task.update({ _id: req.headers.task_id }, { $set: { status: true } }, function (err, result) {
                            if (err) {
                                next(err);
                            } else {
                                res.json({ error: 0, message: "task completed", data: result });
                            }
                        })
                    } else if (data.status == true) {
                        req.get_task.update({ _id: req.headers.task_id }, { $set: { status: false } }, function (err, result) {
                            if (err) {
                                next(err);
                            } else {
                                res.json({ error: 0, message: "task incompleted", data: result });
                            }
                        })
                    }
                } else {
                    res.json({ error: 0, message: "data not found", data: data });
                }
            });
        }
    })
}

exports.shareTask = function (req, res, next) {
    validation.validateAccess(req, function (err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.register_user.findOne({ email: req.body.email }, function (err, users_data) {
                if (err) {
                    res.status(400).json({ error: 1, message: "check email or password" });
                } else if (users_data) {
                    var users_id = [];
                    req.get_task.find({ _id: req.body.task_id }, function (err, data) {
                        users_id = data[0].users_id;
                        users_id.push({
                            id: users_data._id
                        })
                        req.get_task.update({
                            $set: {
                                users_id: users_id
                            }
                        }, function (err, result) {
                            if (err) {
                                res.json({
                                    error: 1
                                });
                            } else {
                                res.json({
                                    error: 0,
                                    data: result
                                });
                            }
                        });
                    });
                } else {
                    res.json({ error: 1, message: "invalid user ! get registered!" })
                }
            });
        }
    })
}

exports.getSingleTask = function (req, res, next) {
    validation.validateAccess(req, function (err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.find({ $and: [{ _id: req.headers.task_id }, { users_id: { "$elemMatch": { "id": access_token_data.user_id } } }] }).exec(function (err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    res.json({ error: 0, message: "task", data: data });
                }
            })
        }
    });

}