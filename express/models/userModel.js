const mongoose = require('mongoose')
var message = 'Something bad happaned';

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(v);
            },
            message: 'Please fill a valid email address'
        },
    },
    password : {
        type : String,
        required : true
    }
})

var User = mongoose.model('master_user',userSchema)

module.exports = {
    create(userData, callback) {
        try {
            var user = new User({
                firstname   : userData.firstname,
                lastname    : userData.lastname,
                mobile      : userData.mobile,
                email       : userData.email,
                password    : userData.password,
            })

            return user.save()
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
    find(userData, callback) {
        try {
            User.find(userData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    delete(userData, callback) {
        try {
            User.deleteOne(userData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    update(userCond,userData, callback) {
        try {
            User.updateOne(userCond, userData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
}