
const express = require('express')


const authCont = require('../controller/authCont');

const route = express.Router();

// Auth route for regisatration
route.post('/sign-up', authCont.register);

// Login route
route.post('/sign-in', authCont.login);

module.exports = route;



