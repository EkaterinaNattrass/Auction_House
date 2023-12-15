const express = require('express');
const router = express.Router();
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const registerUser = require('../modules/register');
const createListing = require('../modules/createListing');

router.get('/', async (req, res) => {
    res.render ('register', {
    failedRegisterMessage: req.flash('registerError')
    })
});

router.post('/', async(req, res) => {

    const registeredUser = await registerUser(req.body);
    if(!registeredUser.success) {
        req.flash('registerError', registeredUser.error + '...Please, try again');
        res.redirect('/register-form');
        return;
    }
    else {
        res.redirect('/')
    }
});

module.exports = router;