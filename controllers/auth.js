const User = require('../models/user');
const { validationResult } = require('express-validator');

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,



        })

    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err: "NOT able to save user in DB" });
        }
        res.json(user);
    });

}

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    User.findOne({ email }, (err, user) => {

        if (err || !user) {
            return res.status(400).json({ error: "User does not exists" })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({ error: "Email and password do not match" })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });
        //send response to the front 
        req.auth = user;
        console.log(req.auth)
        const { _id, name, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    })

    //create token


}

exports.signOut = (req, res) => {
    res.clearCookie("token");

    res.json({ message: "User signout successfully" })
}

//protected route user is logined
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth" //this will put an req.auth with an id
})

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
    //profile id is setup in the frontend and is checked with auth set up by the expressJWT this is checking it for whether the account belongs the same user

    let checker = req.auth;
    if (!checker) {
        return res.status(403).json({ error: "ACCESS DENIED" });

    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: "You are not the admin,Access Denied" })
    }
    next();
}