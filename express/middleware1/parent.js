const config = require('../../config.json')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Post = require("../models/parentModel") 

exports.login = async(req, res) =>{
    try {
        console.log(req.body)
        const username = req.body.email
		const result = await Post.findOne({ 'email':username });

        if (result) {
            const token = jwt.sign({ sub: result.email }, config.secret, { expiresIn: '7d' });
            let data = {status:0}
            data['status'] = 0;
            data['message'] = "Login successfull!";
            data['data'] = result;
            data['token'] = token;
            res.send(data)
        }	else {
            let data = {status:0}
            data['status'] = 0;
            data['message'] = "Login failed!";
            data['data'] = '';
            res.send(data)
        }

	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}

}

//save parent list
exports.saveParent = async(req, res) => {
    try {
        response = {};

		console.log("Save Parent")
        console.log(req.body)
        const username = req.body.email

        // validate
        if (await Post.findOne({ 'email': username })) {
            response.success = false
            response.statuscode = 400
            response.message = 'Username "' + username + '" is already taken'
            return res.status(400).send(response)
        }

        // hash password
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        
		const post = new Post({
			firstname   : req.body.firstname,
			lastname    : req.body.lastname,
			mobile      : req.body.mobile,
			email       : req.body.email,
			password    : req.body.password,
			referel_code: req.body.referel_code,
		})


		var result = await post.save()
		// res.send(post)
        if (!result) {
            response.success = false
            response.statuscode = 400
            response.message = "Samething went wrong"

            return res.status(400).send(response)
        } else {
            response.success = true
            response.statuscode = 200
            response.message = "Parent Submitted"
            response.result = result

            return res.status(200).send(response)
        }
    } catch (err) {
        response.success = false
        response.statuscode = 400
        response.message = "Bad request"
        response.data = err

        return res.status(400).send(response)
    }
}

//get All parent list
exports.parentList = async(req, res) =>{
    try {

		const result = await Post.find()

        console.log(result)
        
		res.send(result)	

	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
}

//get specific parent list
exports.parentListById = async(req, res) =>{

    try {
		const post = await Post.findOne({ _id: req.params.id })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}

}
