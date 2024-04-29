const express = require('express');
const { loginUser,registerUser,getUsers } = require('../userController');
const { userLoginValidate, userRegisterValidate } = require('../utility/userValidation');
const { ensureAuthenticated } = require('../utility/auth');

const routes = express.Router();

routes.post('/register', userRegisterValidate,registerUser);

routes.post('/login', userLoginValidate,loginUser);

routes.get('/users', ensureAuthenticated, getUsers);

module.exports = routes;