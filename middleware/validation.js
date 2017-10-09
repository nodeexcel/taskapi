var encrypt = require('md5');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
module.exports = {
    register_validation: function(body, callback) {
        // console.log(body)
        var valid_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!(body.email.match(valid_mail)))
            callback("invalid email address!", null);
        else if (body.email == null || body.email == "")
            callback("empty email!!", null);
        else if (body.password == null || body.password == "")
            callback("enter password!!", null);
        else if (body.con_password == null || body.con_password == "")
            callback("empty confirm password!!", null);
        else if (!(encrypt(body.password) == encrypt(body.con_password)))
            callback("You have entered passwords do not match !", null);
        else {
            body.password = encrypt(body.password);
            callback("", body);
        }
    },
    login_validation: function(body, callback) {
        // console.log(body);
        if (body.email == "")
            callback("empty email!", null);
        else if (body.password == "")
            callback("empty password!", null);
        else {
            body.password = encrypt(body.password);
            callback("", body);
        }
    },
    validate_task: function(body, callback) {
        if (body.task == "")
            callback("empty task!", null);
        else if (body.date == "")
            callback("empty due date!", null);
        else {
            callback("", body);
        }
    },
    validateAccess: function(req, callback) {
        jwt.verify(req.headers.access_token, "jwt_tok", function(err, access_token_data) {
            if (err) {
                callback(err, "");
            } else {
                callback("", access_token_data);
            }
        });
    }
};