const Auth = require('../models/auth-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser: async (req, res) => {
        const auth = new Auth(req.body);
        auth.password = await bcrypt.hash(auth.password, 10);
        try{
            const response = await auth.save();
            response.password = undefined;
            return res.status(201).json({message:"Success", data: response});
        }
        catch(err) {
            return res.status(400).json({message: "Bad Request"});
        }
    },
    loginUser: async (req, res) => {
        try{
            const user = await Auth.findOne({username: req.body.username});
            if(!user) {
                return res.status(404).json({message: "User not found"});
            }
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if(!isValid) {
                return res.status(401).json({message: "Invalid Credentials"});
            }
            const tokenObject = {
                _id: user._id,
                name: user.name,
                username: user.username
            };
            const jwtToken = jwt.sign(tokenObject, process.env.JWT_SECRET, {expiresIn: '3h'});
            return res.status(200).json({message: "Success", token: jwtToken});
        }
        catch(err)
        {
            return res.status(500).json({message: "Error", err});
        }    
    },
    getUsers: async (req, res) => {
        try{
            const users = await Auth.find({}, {password: 0});
            return res.status(200).json({message: "Success", data: users});
        }
        catch(err) {
            return res.status(500).json({message: "Error", err});
        }
    }
}