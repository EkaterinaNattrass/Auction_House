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
    res.render('listings-loggedin', { listings, profile, successMessage: req.flash('success'), errorMessage: req.flash('error') })
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

router.post('/bid', async (req, res) => {
    amount = req.body.amount;
    console.log(amount)
    const bid = parseInt(amount);
    console.log(bid)
    success = await placeBid(bid, id, req.session.token);
    if (!success) {
        req.flash('error', 'Your bid wasn´t placed');
        res.redirect('/listings-loggedin')   
    } else {
        req.flash('success', 'Your bid was successfully placed');
        res.redirect('/listings-loggedin')
    }
});

module.exports = router;