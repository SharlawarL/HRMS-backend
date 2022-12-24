var model = require('../models')
var message = "Something went wrong"
var utility = require('../../utility')
var bcrypt = require('bcrypt');

module.exports = {

    /**
     * Location Save
     * @param {*} params 
     * @param {*} callback 
     * @returns 
     */
    locationSave(params, callback) {
        try {
            model.findLocation(params.data, async (err, data) => {
                console.log(params)
                if (err) return callback({ message: message, statusCode: 200, status : false }, null)
                else {
                    if (data.length === 0) {
                        model.createLocation(params.data, (err, result) => {
                            if (err) return callback({ message: message, statusCode: 200, status : false }, null)
                            else {
                                return callback(null, {
                                    message: "Created successfully",
                                    result: result,
                                    statusCode: 200,
                                    success: true
                                })
                            }
                        })
                        
                    } else return callback(null, {
                        message: `[${params.data.location}] is already exits`,
                        result: null,
                        statusCode: 200,
                        success: false
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },
    /**
     * Get User
     * @param {*} userData 
     * @param {*} callback 
     * @returns 
     */
    getLocation(params, callback) {
        try {
            model.findLocation({}, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 200, success: false }, null)
                        else return callback(null, {
                            message: "Location Data",
                            result: result,
                            statusCode: 200,
                            success: true
                        })
                    } else return callback(null, {
                        message: "Data not found",
                        result: null,
                        statusCode: 200,
                        success: false
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 200, success: false })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },
    /**
     * Get Location By filter
     * @param {*} params 
     * @param {*} callback 
     * @returns 
     */
     getLocationByFIlter(params, callback) {
        try {
            
            model.findLocation(params, (err, result) => {
                console.log("result ",result)
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 200, success: false }, null)
                        else return callback(null, {
                            message: "Location Data",
                            result: result,
                            statusCode: 200,
                            success: true
                        })
                    } else return callback(null, {
                        message: "Please enter valid ID",
                        result: null,
                        statusCode: 200,
                        success: false
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 200, success: false })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },

    /**
     * Delete Location By ID
     * @param {*} params 
     * @param {*} callback 
     * @returns 
     */
    deleteLocationById(params, callback) {
        try {
            model.findLocation(params, (err, result) => {
                if (result) {
                    model.deleteLocation(params, (errEmp, resultEmp) => {
                        if (resultEmp) {
                            if (errEmp) return callback({ message: message, statusCode: 200, success: false }, null)
                            else return callback(null, {
                                message: "Location Deleted Successfully",
                                result: '',
                                statusCode: 200,
                                success: true
                            })
                        } else {
                            return callback(null, { message: "Samthing went wrong!", statusCode: 200, success: false })
                        }
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 200, success: false })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },
    /**
     * Update Location
     * @param {*} params 
     * @param {*} callback 
     * @returns 
     */
    updateLocation(params, callback) {
        try {
            let idCond = { _id: params.id }
            model.findLocation(idCond, async (err, data) => {
                if (err) return callback({ message: message, statusCode: 400 }, null)
                else {
                    if (data.length === 0) {
                        return callback(null, {
                            message: "Location not exits",
                            result: null,
                            statusCode: 404
                        })
                    } else {
                        model.updateLocation(idCond, params.data, (errEmp, resultEmp) => {
                            if (resultEmp) {
                                if (errEmp) return callback({ message: message, statusCode: 400 }, null)
                                else return callback(null, {
                                    message: "Location Updated Successfully",
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

    /**
     * Designation
     */
    /**
     * Designation Save
     * @param {*} params 
     * @param {*} callback 
     * @returns 
     */
     designationSave(params, callback) {
        try {
            model.findDesignation(params.check, async (err, data) => {
                if (err) return callback({ message: message, statusCode: 200, status : false }, null)
                else {
                    if (data.length === 0) {
                        model.createDesignation(params.data, (err, result) => {
                            if (err) return callback({ message: message, statusCode: 200, status : false }, null)
                            else {
                                return callback(null, {
                                    message: "Created successfully",
                                    result: result,
                                    statusCode: 200,
                                    success: true
                                })
                            }
                        })
                        
                    } else return callback(null, {
                        message: `[${params.data.designation}] is already exits`,
                        result: null,
                        statusCode: 200,
                        success: false
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },
    /**
     * Get User
     * @param {*} designationData 
     * @param {*} callback 
     * @returns 
     */
     getDesignation(params, callback) {
        try {
            model.findDesignation({}, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 200, success: false }, null)
                        else return callback(null, {
                            message: "Designation Data",
                            result: result,
                            statusCode: 200,
                            success: true
                        })
                    } else return callback(null, {
                        message: "Data not found",
                        result: null,
                        statusCode: 200,
                        success: false
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 200, success: false })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },
    /**
     * Get Location By filter
     * @param {*} params 
     * @param {*} callback 
     * @returns 
     */
     getDesignationByFIlter(params, callback) {
        try {
            model.findDesignation(params, (err, result) => {
                if (result) {
                    if (result.length !== 0) {
                        if (err) return callback({ message: message, statusCode: 200, success: false }, null)
                        else return callback(null, {
                            message: "Designation Data",
                            result: result,
                            statusCode: 200,
                            success: true
                        })
                    } else return callback(null, {
                        message: "Please enter valid ID",
                        result: null,
                        statusCode: 200,
                        success: false
                    })
                } else {
                    return callback(null, { message: "No data found!", statusCode: 200, success: false })
                }
            })
        } catch (err) {
            return callback({ message: message, statusCode: 200, success: false }, null)
        }
    },
}