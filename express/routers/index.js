const multer = require('multer');
var bodyParser = require('body-parser')

var express = require('express'),
    routes = express.Router(),
    controller = require('../controller');

var cors = require('cors')

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

/**
 * User API's
 */
// register user
routes.post('/user/login-user',
    cors(corsOptions) ,
    controller.loginUser);
// register user
routes.post('/user/save-user',
    cors(corsOptions) ,
    controller.registerUser);
//Get user
routes.get('/user/get-user',
    cors(corsOptions) ,
    controller.getUser);
//get user by id
routes.get('/user/get-user-by-id/:userId',
    cors(corsOptions) ,
    controller.getUserById);
//delete user by id
routes.get('/user/delete-user-by-id/:userId',
    cors(corsOptions) ,
    controller.deleteUserById);
// update user
routes.post('/user/update-user',
    cors(corsOptions) ,
    controller.updateUser);

/**
 * Employee API's
 */
// register employee
routes.post('/employee/save-employee',
    cors(corsOptions) ,
    controller.registerEmployee);
//Get employee
routes.get('/employee/get-employee',
    cors(corsOptions) ,
    controller.getEmployee);
//get employee by id
routes.get('/employee/get-employee-by-id/:employeeId',
    cors(corsOptions) ,
    controller.getEmployeeById);
//delete employee by id
routes.get('/employee/delete-employee-by-id/:employeeId',
    cors(corsOptions) ,
    controller.deleteEmployeeById);
// update employee
routes.post('/employee/update-employee',
    cors(corsOptions) ,
    controller.updateEmployee);



module.exports = routes;