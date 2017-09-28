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
                    res.status(400).json(err.message);
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
                    next(err);
                } else if (data) {
                    var token = jwt.sign({ user_id: users_data._id }, "jwt_tok", {
                        expiresIn: 3600000
                    });
                    res.json({ error: 0, token: token })
                } else {
                    res.json('Not a user!Get registered')
                }
            });
        }
    });
});
router.post('/add_task', function(req, res, next) {
    validation.validateAccess(req, function(err, access_token_data) {
        if (err) {
            next(err);
        } else {
            validation.validate_task(req.body, function(err, data) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    var task_details = new req.get_task({
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
            next(err);
        } else {
            req.get_task.find({}).exec(function(err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    res.json({ error: 0, message: "all tasks", data: data });
                }
            })
        }
    })
});
router.get('/delete', function(req, res, next) {
    var id = req.headers.user_id;
    validation.validateAccess(req, function(err, data) {
        req.get_task.findOne({ _id: req.headers.user_id }, function(err, data) {
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
    });
});
module.exports = router;