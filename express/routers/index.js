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
 * Employee API's
 */
// register parent
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
// update parent
routes.post('/employee/update-employee',
    cors(corsOptions) ,
    controller.updateEmployee);



module.exports = routes;