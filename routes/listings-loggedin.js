const express = require('express');
const router = express.Router();

const getListings = require('../modules/getListings');
const getProfile = require('../modules/getProfile');
const filterListings = require('../modules/filterListings');
const getOneListing = require('../modules/getOneListing');
const placeBid = require('../modules/placeBid');

router.get('/', async (req, res) => {
    const listings = await getListings();
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    res.render('listings-loggedin', { listings, profile })
});

router.get('/search', async (req, res) => {
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

router.get('/art', async (req, res) => {
    const listings = await filterListings(req.session.token, 'art')
    const profile = await getProfile(req.session.userName, req.session.token);
    res.render('listings-loggedin', { listings, profile });
});

router.get('/books', async (req, res) => {
    const listings = await filterListings(req.session.token, 'books')
    const profile = await getProfile(req.session.userName, req.session.token);
    res.render('listings-loggedin', { listings, profile });
});

router.get('/furniture', async (req, res) => {
    const listings = await filterListings(req.session.token, 'furniture')
    const profile = await getProfile(req.session.userName, req.session.token);
    res.render('listings-loggedin', { listings, profile, });
});

router.get('/jewellery', async (req, res) => {
    const listings = await filterListings(req.session.token, 'jewellery')
    const profile = await getProfile(req.session.userName, req.session.token);
    res.render('listings-loggedin', { listings, profile, });
});

router.post('/bid', async (req, res) => {
    listing = await getOneListing( id, req.session.token);
    id = listing.id; 
    amount = req.body.amount;
    const bid = parseInt(amount);
    success = placeBid(bid, id, req.session.token);
    res.redirect('/listings-loggedin')
});

module.exports = router;