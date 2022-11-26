var express = require('express');
var router = express.Router();
var { Auth, taskOps, taskCrud } = require("../controller");
var { login, register } = Auth;
var { addTask, viewAllTask, editTask, deleteTask } = taskCrud;
var { getSingleTask, getTaskStatus, shareTask } = taskOps;

router.post('/register', register);
router.post('/login', login);
router.post('/add_task', addTask);
router.get('/view_all_task', viewAllTask);
router.delete('/delete', deleteTask);
router.post('/edit_task', editTask);
router.get('/task_status', getTaskStatus);
router.post('/share_task', shareTask);
router.get('/get_one_task', getSingleTask)

module.exports = router;