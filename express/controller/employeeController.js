const services = require('../services')

module.exports = {
    registerEmployee(req, res, next) {
        try {
            var employeeData = {
                email   : req.body.email,
                data: {
                    firstname   : req.body.firstname,
                    lastname    : req.body.lastname,
                    mobile      : req.body.mobile,
                    email       : req.body.email,
                    password    : req.body.password
                }
            }
            
            var response = {}

            services.registerEmployee(employeeData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statusCode = err.statusCode
                    response.message = err.message
                    return res.status(err.statusCode).send(response)
                } else {
                    response.success = true
                    response.statusCode = result.statusCode
                    response.message = result.message
                    response.result = result.result

                    return res.status(result.statusCode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
    getEmployee(req, res, next) {
        try {
            var employeeData = {}
            
            var response = {}

            services.getEmployee(employeeData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statusCode = err.statusCode
                    response.message = err.message
                    return res.status(err.statusCode).send(response)
                } else {
                    response.success = true
                    response.statusCode = result.statusCode
                    response.message = result.message
                    response.result = result.result

                    return res.status(result.statusCode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
    getEmployeeById(req, res, next) {
        try {
            let employeeData = {
                _id: req.params.employeeId
            }
            
            var response = {}

            services.getEmployeeById(employeeData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statusCode = err.statusCode
                    response.message = err.message
                    return res.status(err.statusCode).send(response)
                } else {
                    response.success = true
                    response.statusCode = result.statusCode
                    response.message = result.message
                    response.result = result.result

                    return res.status(result.statusCode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
    deleteEmployeeById(req, res, next) {
        try {
            let employeeData = {
                _id: req.params.employeeId
            }
            
            var response = {}

            services.deleteEmployeeById(employeeData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statusCode = err.statusCode
                    response.message = err.message
                    return res.status(err.statusCode).send(response)
                } else {
                    response.success = true
                    response.statusCode = result.statusCode
                    response.message = result.message
                    response.result = result.result

                    return res.status(result.statusCode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
    updateEmployee(req, res, next) {
        try {
            var employeeData = {
                empId   : req.body.empId,
                data: {
                    firstname   : req.body.firstname,
                    lastname    : req.body.lastname,
                    mobile      : req.body.mobile,
                    email       : req.body.email,
                    password    : req.body.password
                }
            }
            
            var response = {}
            services.updateEmployee(employeeData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statusCode = err.statusCode
                    response.message = err.message
                    return res.status(err.statusCode).send(response)
                } else {
                    response.success = true
                    response.statusCode = result.statusCode
                    response.message = result.message
                    response.result = result.result

                    return res.status(result.statusCode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
}