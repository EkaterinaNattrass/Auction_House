const express = require('express');
const router = express.Router();
const getProfile = require('../modules/getProfile');
const updateAvatar = require('../modules/updateAvatar');

router.get('/', async (req, res) => {
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    const listings = profile.listings;
    res.render('profile', { profile, listings,
        failedUpdateMessage: req.flash('updateError')
     })
});

router.put('/update', async (req, res) => {
    avatar = req.body;
    success = await updateAvatar(avatar, userName, req.session.token);
    if(!success) {
        req.flash('updateError', ' Please, use a valid link');
        res.redirect('/profile'); 
    }
    else {res.redirect('/profile');
    }  
});

module.exports = router;