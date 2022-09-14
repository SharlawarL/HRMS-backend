const { buildCheckFunction } = require('express-validator');
const { isInteger } = require('lodash');
const checkBodyAndQuery = buildCheckFunction(['body', 'params']);

module.exports = {
    val_user: [
        checkBodyAndQuery('firstName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`First name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`First name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`First name must at least 3 character`)
        ,
        checkBodyAndQuery('lastName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Last name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Last name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Last name must at least 3 character`)
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .exists()
            .isString()
            .notEmpty().withMessage(`Password is a required field`)
            .isLength({ min: 6 })
            .withMessage('Password length must be at least 6')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .withMessage('Password should have at least one alpha, number & special character')
    ],

    val_driver: [
        checkBodyAndQuery('firstName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`First name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`First name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`First name must at least 3 character`)
        ,
        checkBodyAndQuery('lastName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Last name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Last name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Last name must at least 3 character`)
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
    ],

    val_driverProfile: [
        checkBodyAndQuery('firstName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`First name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`First name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`First name must at least 3 character`)
        ,
        checkBodyAndQuery('lastName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Last name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Last name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Last name must at least 3 character`)
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
    ],

    val_employeeDetails: [
        checkBodyAndQuery('salary').trim()
            .isInt()
            .exists()
            .isInt().matches(/(?!0+(?:\\.0+)?$)[0-9]+(?:\\.[0-9]+)?/).withMessage('Salary should be in numeric char')
        ,
        checkBodyAndQuery('streetAptNo').trim()
            .notEmpty().withMessage(`Address is a required field`)
            .exists()
            .isLength({ min: 3, max: 500 }).withMessage(`Address should be of min 3 & max 500 char`)
            .isString().withMessage(`Address should be in string format`)
        ,
        checkBodyAndQuery('city').trim()
            .isAlpha()
            .exists()
            .notEmpty().withMessage(`City is a required field`)
            .isString().withMessage(`City should be string type`)
        ,
        checkBodyAndQuery('state').trim()
            .isAlpha()
            .notEmpty().withMessage(`State is a required field`)
            .isString().withMessage(`State should be string type`)
            .exists()
        ,
        checkBodyAndQuery('country').trim()
            .isAlpha()
            .exists()
            .notEmpty().withMessage(`Country is a required field`)
            .isString().withMessage(`Country should be string type`)
        ,
        checkBodyAndQuery('zipcode').trim()
            .isInt()
            .notEmpty().withMessage(`Country is a required field`)
            .exists()
            .matches(/^\d{0,10}$/).withMessage('Enter valid zipcode')
        ,
        checkBodyAndQuery('socialSecurityNo').trim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Social Security Number(SSN) is a required field`)
            .matches(/^\d{3}-?\d{2}-?\d{4}$/).withMessage('Enter valid SSN')
    ],

    val_update_user: [
        checkBodyAndQuery('firstName').rtrim().ltrim()
            .optional()
            .isString()
            .exists()
            .notEmpty().withMessage(`First name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`First name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`First name must at least 3 character`)
        ,
        checkBodyAndQuery('lastName').rtrim().ltrim()
            .optional()
            .exists()
            .isString()
            .notEmpty().withMessage(`Last name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Last name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Last name must at least 3 character`)
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .optional()
            .isString()
            .exists()
            .isInt()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .optional()
            .exists()
            .notEmpty().withMessage(`Email id is a required field`)
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .not().exists()
            .optional()
            .withMessage(`Password is not required a field`)
    ],

    val_update_employeeDetails: [
        checkBodyAndQuery('salary').trim()
            .isInt()
            .exists()
            .optional()
            .isInt().matches(/(?!0+(?:\\.0+)?$)[0-9]+(?:\\.[0-9]+)?/).withMessage('Salary should be in numeric char')
        ,
        checkBodyAndQuery('streetAptNo').trim()
            .optional()
            .notEmpty().withMessage(`Address is a required field`)
            .exists()
            .isLength({ min: 3, max: 500 }).withMessage(`Address should be of min 3 & max 500 char`)
            .isString().withMessage(`Address should be in string format`)
        ,
        checkBodyAndQuery('city').trim()
            .optional()
            .exists()
            .isAlpha()
            .notEmpty().withMessage(`City is a required field`)
            .isString().withMessage(`City should be string type`)
        ,
        checkBodyAndQuery('state').trim()
            .optional()
            .exists()
            .isAlpha()
            .notEmpty().withMessage(`State is a required field`)
            .isString().withMessage(`State should be string type`)
        ,
        checkBodyAndQuery('country').trim()
            .optional()
            .exists()
            .isAlpha()
            .notEmpty().withMessage(`Country is a required field`)
            .isString().withMessage(`Country should be string type`)
        ,
        checkBodyAndQuery('zipcode').trim()
            .optional()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Country is a required field`)
            .matches(/^\d{0,10}$/).withMessage('Enter valid zipcode')
        ,
        checkBodyAndQuery('socialSecurityNo').trim()
            .optional()
            .exists()
            .isString()
            .notEmpty().withMessage(`Social Security Number(SSN) is a required field`)
            .matches(/^\d{3}-\d{2}-\d{4}$/).withMessage('Enter valid SSN')
    ],

    val_signIn: [
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .exists()
            .isString()
            .notEmpty().withMessage(`Password is a required field`)
            .isLength({ min: 6 })
            .withMessage('Password length must be at least 6')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .withMessage('Password should have at least one alpha, number & special character')
        ,
    ],

    val_objectId: (reqField) => [
        checkBodyAndQuery(`${reqField}`).trim()
            .notEmpty().withMessage(`${reqField} is a required field`)
            .exists()
            .isMongoId().withMessage(`Enter valid ${reqField}`)
    ],

    val_latitude_longitude: (location) => {
        if (location.name === 'driver') {
            return [
                checkBodyAndQuery(`${location.lat}`).trim().escape()
                    .exists()
                    .isString()
                    .notEmpty().withMessage(`${location.lat} is a required field`)
                    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
                    .withMessage(`Provide valid ${location.lat}`)
                ,
                checkBodyAndQuery(`${location.long}`).trim().escape()
                    .exists()
                    .isString()
                    .notEmpty().withMessage(`${location.long} is a required field`)
                    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
                    .withMessage(`Provide valid ${location.long}`)
            ]
        }
        if (location.name === 'restaurant') {
            return [
                checkBodyAndQuery(`${location.lat}`).trim().escape()
                    .exists()
                    .isString()
                    .optional()
                    .notEmpty().withMessage(`${location.lat} is a required field`)
                    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
                    .withMessage(`Provide valid ${location.lat}`)
                ,
                checkBodyAndQuery(`${location.long}`).trim().escape()
                    .exists()
                    .isString()
                    .optional()
                    .notEmpty().withMessage(`${location.long} is a required field`)
                    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
                    .withMessage(`Provide valid ${location.long}`)
            ]
        }
        if (location.name === 'customer') {
            return [
                checkBodyAndQuery(`${location.lat}`).trim().escape()
                    .exists()
                    .isString()
                    .optional()
                    .notEmpty().withMessage(`${location.lat} is a required field`)
                    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
                    .withMessage(`Provide valid ${location.lat}`)
                ,
                checkBodyAndQuery(`${location.long}`).trim().escape()
                    .exists()
                    .isString()
                    .optional()
                    .notEmpty().withMessage(`${location.long} is a required field`)
                    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
                    .withMessage(`Provide valid ${location.long}`)
            ]
        }
    },

    val_driverStatus: [
        checkBodyAndQuery('status').trim()
            .exists()
            .notEmpty().withMessage(`driver status is a required field`)
            .isIn(["Active", "Inactive"])
            .isString().withMessage(`driver status should be in string format`)
    ],

    val_emailAddress: [
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .isEmail().withMessage('Invalid email')
    ],

    val_role: [
        checkBodyAndQuery('name').rtrim().ltrim()
            .exists()
            .notEmpty()
            .isString().withMessage(`Name is a required field`)
            .isLength({ min: 3 }).withMessage(`Name must have at least 3 character`)
        ,
        checkBodyAndQuery('description').rtrim().ltrim()
            .isString()
            .exists()
            .withMessage(`Description should contain max 500 char`)
            .isLength({ max: 5000 }).withMessage(`Description must contain max 5000 character`)
        ,
        checkBodyAndQuery('feature.*').rtrim().ltrim()
            .exists()
            .isLength({ min: 1 })
            .notEmpty()
            .isMongoId().withMessage(`Value should be mongo id`)
    ],

    val_update_role: [
        checkBodyAndQuery('name').rtrim().ltrim()
            .exists()
            .notEmpty()
            .optional()
            .isString().withMessage(`Name is a required field`)
            .isLength({ min: 3 }).withMessage(`Name must have at least 3 character`)
        ,
        checkBodyAndQuery('description').rtrim().ltrim()
            .isString()
            .optional()
            .exists()
            .withMessage(`Description should contain max 500 char`)
            .isLength({ max: 5000 }).withMessage(`Description must contain max 5000 character`)
    ],

    val_restaurant: [
        checkBodyAndQuery('restaurantName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Restaurant name is a required field`)
            .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/)
            .withMessage(`Restaurant name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Restaurant name must at least 3 character`)
        ,
        checkBodyAndQuery('ownerFirstName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Owner first name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Owner first name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Owner first name must at least 3 character`)
        ,
        checkBodyAndQuery('ownerLastName').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Owner last name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Owner last name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Owner last name must at least 3 character`)
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .isString()
            .exists()
            .isInt()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .exists()
            .isString()
            .notEmpty().withMessage(`Password is a required field`)
            .isLength({ min: 6 })
            .withMessage('Password length must be at least 6')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .withMessage('Password should have at least one alpha, number & special character')
    ],

    val_restaurantDetails: [
        checkBodyAndQuery('streetAptNo').trim()
            .exists()
            .notEmpty().withMessage(`Address is a required field`)
            .isLength({ min: 3, max: 500 }).withMessage(`Address should be of min 3 & max 500 char`)
            .isString().withMessage(`Address should be in string format`)
        ,
        checkBodyAndQuery('city').trim()
            .isAlpha()
            .exists()
            .notEmpty().withMessage(`City is a required field`)
            .isString().withMessage(`City should be string type`)
        ,
        checkBodyAndQuery('state').trim()
            .isAlpha()
            .exists()
            .notEmpty().withMessage(`State is a required field`)
            .isString().withMessage(`State should be string type`)
        ,
        checkBodyAndQuery('country').trim()
            .isAlpha()
            .exists()
            .notEmpty().withMessage(`Country is a required field`)
            .isString().withMessage(`Country should be string type`)
        ,
        checkBodyAndQuery('zipcode').trim()
            .isInt()
            .notEmpty().withMessage(`Country is a required field`)
            .exists()
            .matches(/^\d{0,10}$/).withMessage('Enter valid zipcode')
        ,
        checkBodyAndQuery('socialSecurityNo').trim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Social Security Number(SSN) is a required field`)
            .matches(/^\d{3}-\d{2}-\d{4}$/).withMessage('Enter valid SSN')
    ],

    val_update_restaurant: [
        checkBodyAndQuery('restaurantName').rtrim().ltrim()
            .optional()
            .exists()
            .isString()
            .notEmpty().withMessage(`Restaurant name is a required field`)
            .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/)
            .withMessage(`Restaurant name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Restaurant name must at least 3 character`)
        ,
        checkBodyAndQuery('ownerFirstName').rtrim().ltrim()
            .optional()
            .isString()
            .exists()
            .notEmpty().withMessage(`Owner first name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Owner first name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Owner first name must at least 3 character`)
        ,
        checkBodyAndQuery('ownerLastName').rtrim().ltrim()
            .optional()
            .exists()
            .isString()
            .notEmpty().withMessage(`Owner last name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Owner last name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Owner last name must at least 3 character`)
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .optional()
            .isString()
            .exists()
            .isInt()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .optional()
            .exists()
            .notEmpty().withMessage(`Email id is a required field`)
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .not().exists()
            .optional()
            .withMessage(`Password is not required a field`)
    ],

    val_user_details: [
        checkBodyAndQuery('streetAptNo').trim()
            .notEmpty().withMessage(`Address is a required field`)
            .exists()
            .isLength({ min: 3, max: 500 }).withMessage(`Address should be of min 3 & max 500 char`)
            .isString().withMessage(`Address should be in string format`)
        ,
        checkBodyAndQuery('city').trim()
            .isAlpha()
            .notEmpty().withMessage(`City is a required field`)
            .isString().withMessage(`City should be string type`)
            .exists()
        ,
        checkBodyAndQuery('state').trim()
            .isAlpha()
            .notEmpty().withMessage(`State is a required field`)
            .exists()
            .isString().withMessage(`State should be string type`)
        ,
        checkBodyAndQuery('country').trim()
            .isAlpha()
            .notEmpty().withMessage(`Country is a required field`)
            .exists()
            .isString().withMessage(`Country should be string type`)
        ,
        checkBodyAndQuery('zipcode').trim()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Country is a required field`)
            .matches(/^\d{0,10}$/).withMessage('Enter valid zipcode')
        ,
        checkBodyAndQuery('socialSecurityNo').trim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Social Security Number(SSN) is a required field`)
            .matches(/^\d{3}-\d{2}-\d{4}$/).withMessage('Enter valid SSN')
    ],

    val_update_user_details: [
        checkBodyAndQuery('streetAptNo').trim()
            .optional()
            .notEmpty().withMessage(`Address is a required field`)
            .exists()
            .isLength({ min: 3, max: 500 }).withMessage(`Address should be of min 3 & max 500 char`)
            .isString().withMessage(`Address should be in string format`)
        ,
        checkBodyAndQuery('city').trim()
            .optional()
            .isAlpha()
            .exists()
            .notEmpty().withMessage(`City is a required field`)
            .isString().withMessage(`City should be string type`)
        ,
        checkBodyAndQuery('state').trim()
            .optional()
            .exists()
            .isAlpha()
            .notEmpty().withMessage(`State is a required field`)
            .isString().withMessage(`State should be string type`)
        ,
        checkBodyAndQuery('country').trim()
            .optional()
            .isAlpha()
            .notEmpty().withMessage(`Country is a required field`)
            .exists()
            .isString().withMessage(`Country should be string type`)
        ,
        checkBodyAndQuery('zipcode').trim()
            .optional()
            .exists()
            .isInt()
            .notEmpty().withMessage(`Country is a required field`)
            .matches(/^\d{0,10}$/).withMessage('Enter valid zipcode')
        ,
        checkBodyAndQuery('socialSecurityNo').trim()
            .optional()
            .isString()
            .exists()
            .notEmpty().withMessage(`Social Security Number(SSN) is a required field`)
            .matches(/^\d{3}-\d{2}-\d{4}$/).withMessage('Enter valid SSN')
        ,
        checkBodyAndQuery('deliveryFee').trim()
            .isInt()
            .exists()
            .optional()
            .notEmpty().withMessage(`deliveryFee is a required field`)
            .isString().withMessage(`deliveryFee should be in string format`)
        ,
        checkBodyAndQuery('tip').trim()
            .isInt()
            .exists()
            .optional()
            .notEmpty().withMessage(`tip is a required field`)
            .isString().withMessage(`tip should be in string format`)
    ],

    val_customOrderId: [
        checkBodyAndQuery('customOrderId').trim()
            .notEmpty().withMessage(`customOrderId is a required field`)
            .isString().withMessage(`customOrderId should be in string format`)
    ],

    val_order_details: [
        checkBodyAndQuery('orderName').rtrim().ltrim()
            .isString()
            .notEmpty().withMessage(`Order name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`RestauOrderrant name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Order name must at least 3 character`)
        ,
        checkBodyAndQuery('items.*.itemsId').trim()
            .notEmpty()
            .isMongoId().withMessage(`Items id is not valid`)
            .isString()
            .exists()
            .notEmpty().withMessage(`Items id is a required field`)
            .isLength({ min: 24, max: 24 }).withMessage(`items id must of least 24 character`)
        ,
        checkBodyAndQuery('items.*.quantity').trim()
            .isInt()
            .exists()
            .exists()
            .isInt().matches(/^[1-9]\d*$/).withMessage('Quantity should be in numeric char & except 0')
            .notEmpty().withMessage(`Quantity is a required field`)
        ,
        checkBodyAndQuery('totalPrice').trim()
            .notEmpty().withMessage(`totalPrice is a required field`)
            .isInt().withMessage(`totalPrice should not be string type`)
        ,
        checkBodyAndQuery('customerName').rtrim().ltrim()
            .isString()
            .notEmpty().withMessage(`Customer name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Customer name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Customer name must at least 3 character`)
        ,
        checkBodyAndQuery('customerMobile').trim().escape()
            .isInt()
            .notEmpty().withMessage(`Customer Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Customer Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('customerAddress').trim()
            .notEmpty().withMessage(`customerAddress is a required field`)
            .isString().withMessage(`customerAddress should be in string format`)
        ,
        checkBodyAndQuery('paymentMode').trim()
            .notEmpty().withMessage(`paymentMode is a required field`)
            .isString().withMessage(`paymentMode should be in string format`)
        ,
        checkBodyAndQuery('deliveryFee').trim()
            .isInt()
            .exists()
            .notEmpty().withMessage(`deliveryFee is a required field`)
            .isString().withMessage(`deliveryFee should be in string format`)
        ,
        checkBodyAndQuery('tip').trim()
            .isInt()
            .exists()
            .notEmpty().withMessage(`tip is a required field`)
            .isString().withMessage(`tip should be in string format`)
    ],
    val_order_update_details: [
        checkBodyAndQuery('orderName').rtrim().ltrim()
            .optional()
            .isString()
            .exists()
            .notEmpty().withMessage(`Order name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`RestauOrderrant name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Order name must at least 3 character`)
        ,
        checkBodyAndQuery('quantity').trim()
            .optional()
            .isInt()
            .exists()
            .notEmpty().withMessage(`quantity is a required field`)
            .isLength({ min: 1 }).withMessage('quantity number length must be 1 digit')
        ,
        checkBodyAndQuery('totalPrice').trim()
            .optional()
            .isInt()
            .exists()
            .notEmpty().withMessage(`totalPrice is a required field`)
            .isString().not().withMessage(`totalPrice should not be string type`)
        ,
        checkBodyAndQuery('customerName').rtrim().ltrim()
            .isString()
            .optional()
            .exists()
            .notEmpty().withMessage(`Customer name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Customer name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Customer name must at least 3 character`)
        ,
        checkBodyAndQuery('customerMobile').trim().escape()
            .optional()
            .isString()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Customer Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Customer Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('customerAddress').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`customerAddress is a required field`)
            .isString().withMessage(`customerAddress should be in string format`)
        ,
        checkBodyAndQuery('deliveryStatus').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`deliveryStatus is a required field`)
            .isIn(["PENDING", "CANCELLED"])
            .isString().withMessage(`deliveryStatus should be in string format`)
        ,
        checkBodyAndQuery('paymentMode').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`paymentMode is a required field`)
            .isIn(["PAY-ON-DELIVERED", "ONLINE-PAYED"])
            .isString().withMessage(`paymentMode should be in string format`)
        ,
        checkBodyAndQuery('paymentStatus').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`paymentStatus is a required field`)
            .isIn(["PAYED", "NOT-PAYED"])
            .isString().withMessage(`paymentStatus should be in string format`)
        ,
        checkBodyAndQuery('deliveryFee').trim()
            .isInt()
            .optional()
            .exists()
            .notEmpty().withMessage(`deliveryFee is a required field`)
            .isString().withMessage(`deliveryFee should be in string format`)
        ,
        checkBodyAndQuery('tip').trim()
            .isInt()
            .optional()
            .exists()
            .notEmpty().withMessage(`tip is a required field`)
            .isString().withMessage(`tip should be in string format`)
        ,
        checkBodyAndQuery(`driverId`).trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`driverId is a required field`)
            .isMongoId().withMessage(`Enter valid driverId`)
        ,
        checkBodyAndQuery('deliveryProof').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`deliveryProof is a required field`)
            .isString().withMessage(`deliveryProof should be in string format`)
        ,
        checkBodyAndQuery('driverLatitude').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`driverLatitude is a required field`)
            .isString().withMessage(`driverLatitude should be in string format`)
        ,
        checkBodyAndQuery('driverLongitutde').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`driverLongitutde is a required field`)
            .isString().withMessage(`driverLongitutde should be in string format`)
        ,
        checkBodyAndQuery('restaurantLatitude').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`restaurantLatitude is a required field`)
            .isString().withMessage(`restaurantLatitude should be in string format`)
        ,
        checkBodyAndQuery('restaurantLongitutde').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`restaurantLongitutde is a required field`)
            .isString().withMessage(`restaurantLongitutde should be in string format`)
        ,
        checkBodyAndQuery(`cancelledBy`).trim()
            .optional()
            .notEmpty().withMessage(`cancelledBy is a required field`)
            .isMongoId().withMessage(`Enter valid cancelledBy`)
        ,
        checkBodyAndQuery(`restaurantId`).trim().escape()
            .optional()
            .not().exists().withMessage(`restaurantId is not editable field`)
        ,
        checkBodyAndQuery(`createdBy`).trim().escape()
            .optional()
            .not().exists().withMessage(`createdBy is not editable field`)
        ,
        checkBodyAndQuery(`customOrderId`).trim().escape()
            .optional()
            .exists()
            .isString().withMessage(`customOrderId should be in string format`)
    ],

    val_password: [
        checkBodyAndQuery(['newPassword']).trim().escape()
            .exists()
            .isString()
            .notEmpty().withMessage(`Password is a required field`)
            .isLength({ min: 6 })
            .withMessage('Password length must be at least 6')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .withMessage('Password should have at least one alpha, number & special character')
        ,
    ],

    val_items: [
        checkBodyAndQuery('items.*.itemImageUrl').trim()
            .exists()
            .notEmpty()
            .isString().withMessage(`item Image Url is a required field`)
        ,
        checkBodyAndQuery('items.*.name').trim()
            .exists()
            .notEmpty()
            .isString().withMessage(`Item name is a required field`)
            .isLength({ min: 3 }).withMessage(`Item name must at least 3 character`)
        ,
        checkBodyAndQuery('items.*.price').trim()
            .exists()
            .isInt().not().equals("0").withMessage('Price should be in numeric char & not 0')
            .notEmpty().withMessage(`Price is a required field`)
    ],

    val_orderStatusByDriver: [
        checkBodyAndQuery('deliveryStatus').trim()
            .optional()
            .exists()
            .notEmpty().withMessage(`deliveryStatus is a required field`)
            .isIn(["PICKEDUP", "DELIVERED"])
            .isString().withMessage(`deliveryStatus should be in string format`)
    ],

    val_update_items: [
        checkBodyAndQuery('items.*.name').trim()
            .exists()
            .optional()
            .notEmpty()
            .isString().withMessage(`Item name is a required field`)
            .isLength({ min: 3 }).withMessage(`Item name must at least 3 character`)
        ,
        checkBodyAndQuery('items.*.price').trim()
            .exists()
            .optional()
            .isInt().not().equals("0").withMessage('Price should be in numeric char & not 0')
            .notEmpty().withMessage(`Price is a required field`)
    ],
    val_contact_details: [
        checkBodyAndQuery('name').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Name must at least 3 character`)
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('description').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`Description is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Description should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Description must at least 3 character`)
        ,
    ],
    val_contact_details_update: [
        checkBodyAndQuery('name').rtrim().ltrim()
            .optional()
            .isString()
            .exists()
            .notEmpty().withMessage(`Name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Name must at least 3 character`)
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .optional()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('mobile').trim().escape()
            .optional()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
        ,
        checkBodyAndQuery('description').rtrim().ltrim()
            .optional()
            .isString()
            .exists()
            .notEmpty().withMessage(`Description is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`Description should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`Description must at least 3 character`)
        ,
    ],

    val_mobile: [
        checkBodyAndQuery('mobile').trim().escape()
            .optional()
            .isInt()
            .exists()
            .notEmpty().withMessage(`Mobile is a required field`)
            .isMobilePhone(["en-IN", "en-US"]).withMessage(`Must provide a valid mobile number`)
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number length must be 10 digit')
    ],

    val_OTP: (param) => [
        checkBodyAndQuery(param).trim().escape()
            .isInt()
            .exists()
            .notEmpty().withMessage(`${param} is a required field`)
            .matches(/(?:\bdigit-|\s|^)(\d{4})(?=[.?\s]|-digit\b|$)/).withMessage(`OTP length must be 4 digit`)
    ]
}