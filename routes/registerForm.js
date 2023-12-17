const express = require('express');
const router = express.Router();
const registerUser = require('../modules/register');

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
        req.flash('success', 'You are successfully registered');
        res.redirect('/')
    }
});

module.exports = router;