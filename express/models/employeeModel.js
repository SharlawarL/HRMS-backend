const mongoose = require('mongoose')
var message = 'Something bad happaned';

const employeeSchema = new mongoose.Schema({
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

var Employee = mongoose.model('master_employee',employeeSchema)

module.exports = {
    create(employeeData, callback) {
        try {
            var employee = new Employee({
                firstname   : employeeData.firstname,
                lastname    : employeeData.lastname,
                mobile      : employeeData.mobile,
                email       : employeeData.email,
                password    : employeeData.password,
            })

            return employee.save()
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
    find(employeeData, callback) {
        try {
            Employee.find(employeeData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    delete(employeeData, callback) {
        try {
            Employee.deleteOne(employeeData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
    update(empCond,employeeData, callback) {
        try {
            console.log(empCond)
            console.log(employeeData)
            Employee.updateOne(empCond, employeeData, (err, data) => {
                if (err) return callback(err, null)
                else return callback(null, data)
            })
        } catch (err) {
            return callback(message, null)
        }
    },
}