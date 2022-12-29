const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');

exports.signup = (req, res) => {
    const user = registerUser(req);

        user.save(err => {
            if (err) {
                console.log("error in", err);
                res.send(err);
            } else {
                console.log("Registered", user);
                res.send({
                    message: 'User Succefully Registered'
                })
            }
        })
}

exports.todo = (req, res) => {
    const user = registerUser(req);


       console.log(user)
    
        user.save(err => {
            if (err) {
                console.log("error in", err);
                res.send(err);
            } else {
                console.log("Registered", user);
                res.send({
                    message: 'User Succefully Registered'
                })
            }
        })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
        if (check500Error(err,res)) {
            return;
            }
            if (!user) {
            return res.status(400).json({message:'User not found'})
            }
            
            if (!isValidPassword(user, req.body.password)) {
                return res.status(401).json({accessToken:null,message:'Invalid password'})
            }
            res.status(200)
                .json({
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    },
                    message: 'Login successful',
                })

    })
}

function isValidPassword(user,password) {
    return bcrypt.compareSync(password, user.password);
}

function check500Error(err,res) {
    if (err) {
        res.status(500).json({ message: err })
        return true;
    }
    return false;
}

function registerUser(req) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
    })
    return user;
}