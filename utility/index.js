const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    nodeMailer = require('nodemailer'),
    model = require('../express/models'),
    _ = require('lodash'),
    message = "Something went wrong, try again",
    checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    admin = require("firebase-admin"),
    unauthorize = { success: false, statuscode: 401, message: "Unauthorized user" };

module.exports = {
    setUserType: (userType) => (req, _res, next) => {
        var data = { name: userType }
        req.userType = data
        return next();
    },

    checkUserType: (userTypes) => (req, res, next) => {
        return !userTypes.includes(req.token.userType)
            ? res.status(401).json(unauthorize)
            : next();
    },

    checkFeatureAccess: async (req, res, next) => {
        if (req.token.userType !== 'superadmin') {
            getPermission(req)
                .then(data => data ? next() : res.status(401).json(unauthorize))
                .catch((err) => res.status(401).json({
                    auth: false,
                    statuscode: 401,
                    message: 'Failed to authenticate'
                }))
        }
        else {
            return next()
        }
    },

    capitalize: (word) => {
        return _.capitalize(word)
    },

    getLastWeek: () => {
        // to get last 7 days
        // var lastWeek = new Date();
        // lastWeek.setDate(lastWeek.getDate() - 7);

        // to get last week
        var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
            , day = beforeOneWeek.getDay()
            , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
            , lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
            , lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));

        return { monday: lastMonday, sunday: lastSunday };

        // d = new Date(d);
        // var day = d.getDay(),
        //     diff = d.getDate() - day + (day == 0 ? -6 : 1);
        // return new Date(d.setDate(diff)).toLocaleDateString();
    },

    optional: (req, res, next) => {
        req.optional = true
        return next()
    },

    uploadImg: (req, res, next) => {
        try {
            var singleUpload = upload.single('file')

            singleUpload(req, res, (err, data) => {
                if (err) return res.status(404).json({ message: "Something went wrong", statuscode: 404 })
                else {
                    if (req.optional && (req.file === undefined)) {
                        return next()
                    } else if (req.file === undefined) {
                        return res.status(400).send({
                            success: false,
                            statuscode: 400,
                            message: req.fileValidationError
                        });
                    }
                    req.s3url = req.file.location
                    return next();
                }
            })
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", statuscode: 404 })
        }
    },

    // for validating image file
    // val_imageFilter: (req, res, next) => {
    //     if (req.file !== undefined) {
    //         let checkextension = (/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/).test(req.file.originalname)
    //         // Accept images only
    //         if (!checkextension) {
    //             var fileValidationError = `Method accespts only images [jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF]', ['Image size should be less than 2mb], ['The file uploaded is not an image']`;
    //             return res.status(400).send({
    //                 success: false,
    //                 statuscode: 400,
    //                 message: fileValidationError
    //             });
    //         }
    //         if (req.file.size >= 2097152) return res.status(400).send({
    //             success: false,
    //             statuscode: 400,
    //             message: "File size should be less than 2MB"
    //         })
    //     }
    //     return next()
    // },

    generateRandomPass: () => {
        return Math.random().toString(36).slice(-8);
    },

    hashPassword: (password) => {
        const saltRounds = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, saltRounds);
        return hashPassword;
    },

    generateOTP: () => {
        return Math.floor(1000 + Math.random() * 9000);
    },

    generateToken: (payload) => {
        try {
            var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE });
            return { auth: true, message: "Token generated", token: token }
        }
        catch (err) {
            return { auth: false, message: message };
        }
    },

    verifyToken: (req, res, next) => {
        try {
            var token = req.headers['x-access-token'] || req.headers["token"] || req.params.token;
            if (!token) return res.status(401).send({ auth: false, statuscode: 401, message: 'No token provided.' });
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
                if (err) { return res.status(401).json({ auth: false, statuscode: 401, message: 'Failed to authenticate..', error: err }); }
                req.token = decoded //token added in the request process

                return next();
            })
        }
        catch (err) {
            return res.status(401).json({
                auth: false,
                statuscode: 401,
                message: 'Failed to authenticate'
            });
        }
    },

    verifySocketToken: (socket, next) => {
        try {
            var token = socket.token;
            if (!token) return next('No token provided.');
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
                if (err) { return next('Failed to authenticate..'); }
                socket.token = decoded //token added in the request process

                return next();
            })
        }
        catch (err) {
            return next('Failed to authenticate');
        }
    },

    checkProfileAlreadyCompleted: (req, res, next) => {
        if (req.token.isProfileCompleted) return res.status(400).json({
            success: false,
            statuscode: 400,
            message: 'Profile is already completed'
        });
        return next();
    },

    checkProfileCompleted: (req, res, next) => {
        if (!req.token.isProfileCompleted) return res.status(400).json({
            success: false,
            statuscode: 400,
            message: 'Please complete your profile'
        });
        return next();
    },

    dynamicData: (req, res, next) => {
        req.customObj = { _id: req.token._id };
        return next();
    },

    sendEmail: (emailData, type) => {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: emailData.emailId,
        };

        if (type === "reset") {
            mailOptions.subject = `Boston Bitez - forget mobile number`
            mailOptions.html = `<div>Enter this OTP to recover mobile number<br></br><div style={color:#000000}>${emailData.resetOTP}</div></div>`
        }
        if (type === "sendUserDetails") {
            mailOptions.subject = `Boston Bitez - recover mobile number`
            mailOptions.html = `<div>Recovered mobile number is:<br></br><div style={color:#000000}>[${emailData.mobile}]</div></div>`
        }
        if (type === "verification") {
            mailOptions.subject = `The Article - validate your email address`
            mailOptions.html = '<p>Click <a href="' + url + '">here</a> to verify account</p>'
        }

        smtpTransporter(mailOptions)
    },

    sendOTP: (receiver) => {
        let message = `<#>Onetime password is : ${receiver.OTP}.`;
        let client = require('twilio')(process.env.TWILIO_ACOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        client.messages
            .create({ body: message, from: process.env.TWILIO_MOBILE, to: '+91' + receiver.mobile })
            .then(message => console.log(message.sid));
        return
    },

    sendNotificationToDriver: async (orderDetails) => {
        let drivers = await model.getAllDriverToken();
        let registrationTokens = [];
        registrationTokens = drivers.map(data => data.notificationToken)
        console.log(registrationTokens);
        if (registrationTokens.length !== 0) {
            // var message = {
            //     data: {
            //         Orderdetails:
            //             `OrderId: ${orderDetails.customOrderId},
            //                 Order name: ${orderDetails.orderName},
            //                 Res name: ${orderDetails.restaurantId.restaurantname},
            //                 Res mobile: ${orderDetails.restaurantId.mobile}
            //                 Res streetAptNo: ${orderDetails.restaurantId.streetAptNo},
            //                 Res zipcode: ${orderDetails.restaurantId.zipcode},
            //                 Res city: ${orderDetails.restaurantId.city},
            //                 Res state: ${orderDetails.restaurantId.state},
            //                 Res country: ${orderDetails.restaurantId.country}
            //                 Customer name: ${orderDetails.customerName},
            //                 Customer mobile: ${orderDetails.customerMobile},
            //                 Delivery address: ${orderDetails.customerAddress}`
            //     },
            //     tokens: registrationTokens

            let message = {
                tokens: registrationTokens,
                notification: {
                    "title": "Boston Bitez Driver",
                    "body": "This is for testing puppose"
                }
            }

            admin.messaging().sendMulticast(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                    response.responses.map(d => {
                        console.log(d.error);
                    })
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        } else {
            console.log("No notificaton token");
        }
    },

    sendNotificationToRestaurant: async (receiver) => {
        let restaturant = await model.getRestaurantToken(receiver.restaurantId);
        let registrationTokens = restaturant[0].notificationToken;

        if (registrationTokens) {
            let message = {
                token: registrationTokens,
                notification: {
                    "title": "Boston Bitez Restaurant",
                    "body": `Order [${receiver.customOrderId}] accepted by driver [${receiver.driverId.firstName} ${receiver.driverId.lastName}] Ph:${receiver.driverId.mobile}`
                }
            }

            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        } else {
            console.log("No notificaton token");
        }
    },

    // otpService: () => {
    //     const accountSid = process.env.TWILIO_ACCOUNT_SID;
    //     const authToken = process.env.TWILIO_AUTH_TOKEN;
    //     const client = require('twilio')(accountSid, authToken);

    //     client.messages
    //         .create({
    //             body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //             from: '+15017122661',
    //             to: '+15558675310'
    //         })
    //         .then(message => console.log(message.sid));
}

function smtpTransporter(mailOptions) {
    const smtpTransporter = nodeMailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASSWORD
        },
    });

    smtpTransporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log("SMTP Transport sending mail failed: ", JSON.stringify(err));
        else console.log("SMTP Transport sending mail done: ", data)
    });
}

const getPermission = async (req) => {
    var { method, url } = req;
    var found = false;
    var featureList = await model.getFeature({})

    return new Promise((resolve, reject) => {
        try {
            if (req.token.role.length !== 0 || req.token.role !== null) {
                req.token.role.forEach((obj) => {
                    featureList.forEach(ele => {
                        obj.feature.filter(val => {
                            if (val._id === String(ele._id)) {
                                if (ele.accessurl.includes(':employeeId')) {
                                    ele.accessurl = ele.accessurl.replace(':employeeId', req.params.employeeId)
                                }
                                if (ele.accessurl.includes(':roleId')) {
                                    ele.accessurl = ele.accessurl.replace(':roleId', req.params.roleId)
                                }
                                if (ele.accessurl.includes(':restaurantId')) {
                                    ele.accessurl = ele.accessurl.replace(':restaurantId', req.params.restaurantId)
                                }
                                // console.log("url",url);
                                // console.log(ele.accessurl);
                                let currentUrl = new RegExp(`^${ele.accessurl}$`)
                                // console.log(currentUrl.test(url));
                                var result = currentUrl.test(url)
                                if (result) {
                                    if (method === ele.method) {
                                        found = true;
                                        return resolve(found)
                                    } else {
                                        found = false;
                                        return resolve(found)
                                    }
                                } else {
                                    found = false
                                }
                            }
                        })
                    })
                })
                return resolve(found)
            } else {
                return resolve(found)
            }
        } catch (err) {
            return reject(err)
        }
    })
}