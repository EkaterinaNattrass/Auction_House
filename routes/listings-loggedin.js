const express = require('express');
const router = express.Router();
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');

const getListings = require('../modules/getListings');
const filterListings = require('../modules/filterListings');

router.get('/listings-loggedin', async (req, res) => {
    const listings = await getListings();
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    res.render('listings-loggedin', { listings, profile })
});

router.get('/listings-loggedin/search', async (req, res) => {
    const searchWord = req.query.search;

    if (!searchWord) { return res.send('Please, fill in the search form')};

    const listings = await getListings();
    const filteredListings = listings.filter((listing) => {
        const title = listing.title ? listing.title.toLowerCase() : '';
        const description =  listing.description ? listing.description.toLowerCase() : '';
        return  title.includes(searchWord.toLowerCase())  ||  description.includes(searchWord.toLowerCase())
    });
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    res.render('search-loggedin', { filteredListings, profile});
})