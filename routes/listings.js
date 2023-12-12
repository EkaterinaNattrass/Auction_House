const express = require('express');
const router = express.Router();
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');

const getListings = require('../modules/getListings');
const getOneListing = require('../modules/getOneListing');
const createListing = require('../modules/createListing');
const updateListing = require('../modules/updateListing');
const deleteListing = require('../modules/delete');
const getProfile = require('../modules/getProfile');
const placeBid = require('../modules/placeBid');
const filterListings = require('../modules/filterListings');

router.get('/', async (req, res) => {
    const listings = await getListings();
    res.render('listings', { listings })
});

router.get('/:id', async(req,res) => {
    id = req.params.id;
    const listing = await getOneListing(id);
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    res.render('details', { listing, profile });
});

router.get('/:id/update', async (req, res) => {
    id = req.params.id;
    listing = await getOneListing( id, req.session.token);
    res.render('update', { id });
})

router.put('/:id', async (req, res) => {
    id = req.params.id;
    updatedListing = req.body;
    success = await updateListing (updatedListing, id, req.session.token);
    res.redirect('/profile');
})

router.delete('/:id', async (req,res) => {
    id = req.params.id;
    deletedListing = await deleteListing( id, req.session.token);
    res.redirect('/profile');
});

router.post('/new', async(req, res) => {
    const listingData = req.body;
    success = createListing(listingData, req.session.token);
    media = listingData.media;
    res.redirect('/profile');
});

router.post('/bid', async (req, res) => {
    listing = await getOneListing( id, req.session.token);
    id = listing.id; 
    amount = req.body;
    success = placeBid(amount, id, req.session.token);
    res.redirect('/profile')
});

module.exports = router;

