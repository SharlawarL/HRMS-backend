const mongoose = require('mongoose')
var message = 'Something bad happaned';

const designationSchema = new mongoose.Schema({
    designation : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    updatedBy : {
        type : String
    },
    updatedOn: {
        type: String
    },
    createdBy : {
        type : String,
        required : true
    },
    createdOn: {
        type: String,
        default: new Date().toLocaleString()
    }
})

var Designation = mongoose.model('master_designation',designationSchema)

module.exports = {
    create(params, callback) {
        try {
            var designation = new Designation({
                designation     : params.designation,
                company         : params.company,
                createdBy       : params.createdBy,
                updatedBy       : params.createdBy,
                updatedOn       : new Date().toLocaleString()
            })

            return designation.save()
                .then(result => 
                    {
                        callback(null, result)
                    })
                .catch(err => { 
                    callback(err, null) 
                })
        } catch (err) {
            return callback(message, null)
        }
    },
    find(params, callback) {
        try {
            Designation.find(params, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    delete(params, callback) {
        try {
            Designation.deleteOne(params, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    update(paramCond, paramData, callback) {
        try {
            Designation.updateOne(paramCond, paramData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
}