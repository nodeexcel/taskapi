var express = require('express');
var app = express();
var encrypt = require('md5');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var validation = require('../middleware/validation');
var MongoClient = require('mongodb').MongoClient;
router.post('/register', function(req, res, next) {
    validation.register_validation(req.body, function(err, data) {
        if (err) {
            res.status(400).json(err);
        } else {
            var detail = new req.register_user({
                email: data.email,
                password: data.password
            })
            detail.save(function(err, data) {
                if (err) {
                    res.status(400).json({ error: 1, message: "already exist" });
                } else
                    res.json({ error: 0, message: "data inserted", data: data })
            })
        }
    })
});

router.post('/login', function(req, res, next) {
    validation.login_validation(req.body, function(err, data) {
        if (err) {
            next(err);
        } else {
            req.register_user.findOne({ email: data.email, password: data.password }, function(err, users_data) {
                if (err) {
                    res.status(400).json({ error: 1, message: "check email or password" });
                } else if (users_data) {
                    var token = jwt.sign({ user_id: users_data._id }, "jwt_tok", {
                        expiresIn: 3600000
                    });
                    res.json({ error: 0, token: token })
                } else {
                    res.json({ error: 1, message: "ivalid user ! get registered!" })
                }
            });
        }
    });
});

router.post('/add_task', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            validation.validate_task(req.body, function(err, data) {
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
                    task_details.save(function(err, data) {
                        if (err) {
                            res.status(400).json(err.message);
                        } else
                            res.json({ error: 0, message: "data inserted", data: data })
                    })
                }
            })
        }
    })
});

router.get('/view_all_task', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.find({ users_id: { "$elemMatch": { "id": access_token_data.user_id } } }).exec(function(err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    res.json({ error: 0, message: "all tasks", data: data });
                }
            })
        }
    })
});

router.delete('/delete', function(req, res, next) {
    var id = req.headers.task_id;
    validation.validateAccess(req, function(err, data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.findOne({ _id: req.headers.task_id }, function(err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    req.get_task.remove({ "_id": data._id }, function(err, result) {
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
});

router.post('/edit_task', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            validation.validate_task(req.body, function(err, data) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    req.get_task.update({ _id: req.headers.task_id }, { $set: { task: req.body.task } }, function(err, result) {
                        if (err) {
                            next(err);
                        } else {
                            req.get_task.find({ _id: req.headers.task_id }, function(err, data) {
                                res.json({ error: 0, message: "task updated", data: data });
                            });
                        }
                    })
                }
            })
        }
    })
});

router.get('/task_status', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.findOne({ _id: req.headers.task_id }, function(err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    if (data.status == false) {
                        req.get_task.update({ _id: req.headers.task_id }, { $set: { status: true } }, function(err, result) {
                            if (err) {
                                next(err);
                            } else {
                                res.json({ error: 0, message: "task completed", data: result });
                            }
                        })
                    } else if (data.status == true) {
                        req.get_task.update({ _id: req.headers.task_id }, { $set: { status: false } }, function(err, result) {
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
});

router.post('/share_task', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.register_user.findOne({ email: req.body.email }, function(err, users_data) {
                if (err) {
                    res.status(400).json({ error: 1, message: "check email or password" });
                } else if (users_data) {
                    var users_id = [];
                    req.get_task.find({ _id: req.body.task_id }, function(err, data) {
                        users_id = data[0].users_id;
                        users_id.push({
                            id: users_data._id
                        })
                        req.get_task.update({
                            $set: {
                                users_id: users_id
                            }
                        }, function(err, result) {
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
});

router.get('/get_one_task', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next({ error: err, status: 403 });
        } else {
            req.get_task.find({ $and: [{ _id: req.headers.task_id }, { users_id: { "$elemMatch": { "id": access_token_data.user_id } } }] }).exec(function(err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    res.json({ error: 0, message: "task", data: data });
                }
            })
        }
    });

})

module.exports = router;