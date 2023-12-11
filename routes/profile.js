const express = require('express');
const router = express.Router();
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const getProfile = require('../modules/getProfile');
const updateAvatar = require('../modules/updateAvatar');

router.get('/', async (req, res) => {
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    const listings = profile.listings;
    res.render('profile', { profile, listings })
});

router.put('/update', async (req, res) => {
    avatar = req.body;
    userName = req.session.userName;
    const updatedAvatar = await updateAvatar(avatar, userName, req.session.token);
    const profile = await getProfile(req.session.userName, req.session.token);
    const listings = profile.listings;
    res.render('profile', { profile, avatar, listings })
});