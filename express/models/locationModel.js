const mongoose = require('mongoose')
var message = 'Something bad happaned';

const locationSchema = new mongoose.Schema({
    location : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    pincode : {
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

var Location = mongoose.model('master_location',locationSchema)

module.exports = {
    create(params, callback) {
        try {
            var location = new Location({
                location   : params.location,
                address    : params.address,
                pincode    : params.pincode,
                company    : params.company,
                createdBy   : params.createdBy,
                updatedBy   : params.createdBy,
                updatedOn   : new Date().toLocaleString()
            })

            return location.save()
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
            Location.find(params, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    delete(params, callback) {
        try {
            Location.deleteOne(params, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    update(paramCond, paramData, callback) {
        try {
            Location.updateOne(paramCond, paramData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
}