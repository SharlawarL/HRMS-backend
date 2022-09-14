var model = require('../models')
var message = "Something went wrong"
var utility = require('../../utility')
var bcrypt = require('bcrypt');

module.exports = {
    registerEmployee(employeeData, callback) {
        try {
            model.findEmployee({ email: employeeData.email }, async (err, data) => {
                if (err) return callback({ message: message, statusCode: 400 }, null)
                else {
                    if (data.length === 0) {
                        employeeData.data.password = await utility.hashPassword(employeeData.data.password)
                        console.log(employeeData)
                        model.createEmployee(employeeData.data, (err, result) => {
                        console.log(result)
                            if (err) return callback({ message: message, statusCode: 400 }, null)
                            else {
                                return callback(null, {
                                    message: "Created successfully",
                                    result: result,
                                    statusCode: 200
                                })
                            }
                        })
                    } else return callback(null, {
                        message: `[${employeeData.email}] is already registered`,
                        result: null,
                        statusCode: 404
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
    getEmployee(employeeData, callback) {
        try {
            model.findEmployee({}, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 400 }, null)
                        else return callback(null, {
                            message: "Employee Data",
                            result: result,
                            statusCode: 200
                        })
                    } else return callback(null, {
                        message: "Not a valid user",
                        result: null,
                        statusCode: 404
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 404 })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
    getEmployeeById(employeeData, callback) {
        try {
            model.findEmployee(employeeData, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 400 }, null)
                        else return callback(null, {
                            message: "Employee Data",
                            result: result,
                            statusCode: 200
                        })
                    } else return callback(null, {
                        message: "Please enter valid ID",
                        result: null,
                        statusCode: 404
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 404 })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
    deleteEmployeeById(employeeData, callback) {
        try {
            model.findEmployee(employeeData, (err, result) => {
                if (result) {
                    model.deleteEmployee(employeeData, (errEmp, resultEmp) => {
                        if (resultEmp) {
                            if (errEmp) return callback({ message: message, statusCode: 400 }, null)
                            else return callback(null, {
                                message: "Employee Deleted Successfully",
                                result: '',
                                statusCode: 200
                            })
                        } else {
                            return callback(null, { message: "Samthing went wrong!", statusCode: 404 })
                        }
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 404 })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
    updateEmployee(employeeData, callback) {
        try {
            let empCond = { _id: employeeData.empId }
            model.findEmployee(empCond, async (err, data) => {
                if (err) return callback({ message: message, statusCode: 400 }, null)
                else {
                    if (data.length === 0) {
                        return callback(null, {
                            message: "Employee not exits",
                            result: null,
                            statusCode: 404
                        })
                    } else {
                        model.updateEmployee(empCond, employeeData.data, (errEmp, resultEmp) => {
                            if (resultEmp) {
                                if (errEmp) return callback({ message: message, statusCode: 400 }, null)
                                else return callback(null, {
                                    message: "Employee Updated Successfully",
                                    result: '',
                                    statusCode: 200
                                })
                            } else {
                                return callback(null, { message: "Samthing went wrong!", statusCode: 404 })
                            }
                        })
                    }
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
}