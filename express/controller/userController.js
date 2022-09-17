const services = require('../services')

module.exports = {
    /**
     * Register User
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    registerUser(req, res, next) {
        try {
            var userData = {
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

            services.registerUser(userData, (err, result) => {
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
    /**
     * Get User
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getUser(req, res, next) {
        try {
            var userData = {}
            
            var response = {}

            services.getUser(userData, (err, result) => {
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
    /**
     * Get User By ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getUserById(req, res, next) {
        try {
            let userData = {
                _id: req.params.employeeId
            }
            
            var response = {}

            services.getUserById(userData, (err, result) => {
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
    /**
     * Delete User By ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteUserById(req, res, next) {
        try {
            let userData = {
                _id: req.params.employeeId
            }
            
            var response = {}

            services.deleteUserById(userData, (err, result) => {
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
    /**
     * Update user by Email
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    updateUser(req, res, next) {
        try {
            var userData = {
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
            services.updateUser(userData, (err, result) => {
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