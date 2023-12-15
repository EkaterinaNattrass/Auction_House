const express = require('express');
const router = express.Router();
const loginUser = require('../modules/login');

router.get('/', async (req, res) => {
    res.redirect('/');
});

router.post('/', async(req, res) => {

    const loggedInUser = await loginUser(req.body);

    if (loggedInUser.success) {
        req.session.token = loggedInUser.token;
        req.session.userName = loggedInUser.userName;
        res.redirect('/profile');
    } else {
        req.flash ('loginError', loggedInUser.error + '...Please, try again');
        res.redirect('/');
    }
});

module.exports = router;
