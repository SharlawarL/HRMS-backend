const services = require('../services')

module.exports = {
    
    /**
     * Location Save
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     locationSave(req, res, next) {
        try {
            var params = {
                data: {
                    location   : req.body.location,
                    address    : req.body.address,
                    pincode      : req.body.pincode,
                    company     : req.body.company,
                    updatedBy    : req.body.createdBy,
                    createdBy    : req.body.createdBy,
                }
            }
            
            var response = {}

            services.locationSave(params, (err, result) => {
                if (err) {
                    response.success = err.success
                    response.statusCode = err.statusCode
                    response.message = err.message
                    return res.status(err.statusCode).send(response)
                } else {
                    response.success = result.success
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
    getLocation(req, res, next) {
        try {
            var params = {}
            var response = {}

            services.getLocation(params, (err, result) => {
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
    getLocationById(req, res, next) {
        try {
            let params = {
                _id: req.params.id
            }
            var response = {}

            services.getLocationByFIlter(params, (err, result) => {
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
     * Get User By Company
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
      getLocationByCompany(req, res, next) {
        try {
            let params = {
                company: req.params.id
            }
            
            var response = {}

            services.getLocationByFIlter(params, (err, result) => {
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
     * Delete Location By ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     deleteLocationById(req, res, next) {
        try {
            let params = {
                _id: req.params.id
            }
            
            var response = {}

            services.deleteLocationById(params, (err, result) => {
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
     * Update location by id
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    updateLocation(req, res, next) {
        try {
            var params = {
                id   : req.body.id,
                data: {
                    location   : req.body.location,
                    address    : req.body.address,
                    pincode      : req.body.pincode,
                    company     : req.body.company,
                    updatedBy    : req.body.user,
                    updatedOn    : new Date().toLocaleString()

                }
            }
            
            var response = {}
            services.updateLocation(params, (err, result) => {
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