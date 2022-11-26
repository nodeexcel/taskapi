const validation = require("../middleware/validation");
var jwt = require('jsonwebtoken');

exports.register = function (req, res, next) {
    validation.register_validation(req.body, function (err, data) {
        if (err) {
            res.status(400).json(err);
        } else {
            var detail = new req.register_user({
                email: data.email,
                password: data.password
            })
            detail.save(function (err, data) {
                if (err) {
                    res.status(400).json({ error: 1, message: "already exist" });
                } else
                    res.json({ error: 0, message: "data inserted", data: data })
            })
        }
    })
}

exports.login = function (req, res, next) {
    validation.login_validation(req.body, function (err, data) {
        if (err) {
            next(err);
        } else {
            req.register_user.findOne({ email: data.email, password: data.password }, function (err, users_data) {
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
}