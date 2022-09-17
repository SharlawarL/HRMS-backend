var model = require('../models')
var message = "Something went wrong"
var utility = require('../../utility')
var bcrypt = require('bcrypt');

module.exports = {
    /**
     * User Login
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
     loginUser(userData, callback) {
        try {
            model.findUser({ email: userData.email }, (err, result) => {
                if (err) return callback({ message: message, statusCode: 400 }, null)
                else {
                    bcrypt.compare(userData.password, result[0].password, async (err, data) => {
                        if (err) return callback({ message: message, statuscode: 400 }, null)
                        else {
                            if (data) {
                                if (result.length !== 0) {
                                    if (err) return callback({ message: message, statusCode: 400 }, null)
                                    else return callback(null, {
                                        message: "Login Successfully",
                                        result: result,
                                        statusCode: 200
                                    })
                                } else return callback(null, {
                                    message: "Not a valid user",
                                    result: null,
                                    statusCode: 404
                                })
                            } else {
                                return callback(null, { message: "please enter valid password", statusCode: 404 })
                            }
                        }
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
    /**
     * Register user
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
    registerUser(userData, callback) {
        try {
            model.findUser({ email: userData.email }, async (err, data) => {
                if (err) return callback({ message: message, statusCode: 400 }, null)
                else {
                    if (data.length === 0) {
                        userData.data.password = await utility.hashPassword(userData.data.password)
                        console.log(userData)
                        model.createUser(userData.data, (err, result) => {
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
                        message: `[${userData.email}] is already registered`,
                        result: null,
                        statusCode: 404
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 404 }, null)
        }
    },
    /**
     * Get User
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
    getUser(userData, callback) {
        try {
            model.findUser({}, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 400 }, null)
                        else return callback(null, {
                            message: "User Data",
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
    /**
     * Get User by ID
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
    getUserById(userData, callback) {
        try {
            model.findUser(userData, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 400 }, null)
                        else return callback(null, {
                            message: "User Data",
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
    /**
     * Delete User By ID
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
    deleteUserById(userData, callback) {
        try {
            model.findUser(userData, (err, result) => {
                if (result) {
                    model.deleteUser(userData, (errEmp, resultEmp) => {
                        if (resultEmp) {
                            if (errEmp) return callback({ message: message, statusCode: 400 }, null)
                            else return callback(null, {
                                message: "User Deleted Successfully",
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
    /**
     * Update User
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
    updateUser(userData, callback) {
        try {
            let empCond = { _id: userData.empId }
            model.findUser(empCond, async (err, data) => {
                if (err) return callback({ message: message, statusCode: 400 }, null)
                else {
                    if (data.length === 0) {
                        return callback(null, {
                            message: "User not exits",
                            result: null,
                            statusCode: 404
                        })
                    } else {
                        model.updateUser(empCond, userData.data, (errEmp, resultEmp) => {
                            if (resultEmp) {
                                if (errEmp) return callback({ message: message, statusCode: 400 }, null)
                                else return callback(null, {
                                    message: "User Updated Successfully",
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