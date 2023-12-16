const express = require('express');
const router = express.Router();

const getListings = require('../modules/getListings');
const getOneListing = require('../modules/getOneListing');
const createListing = require('../modules/createListing');
const updateListing = require('../modules/updateListing');
const deleteListing = require('../modules/delete');
const getProfile = require('../modules/getProfile');
const placeBid = require('../modules/placeBid');

router.get('/', async (req, res) => {
    const listings = await getListings();
    res.render('listings', { listings })
});

router.get('/:id', async(req,res) => {
    id = req.params.id;
    const listing = await getOneListing(id);
    listingBids = listing.bids;
    latestBid = listingBids[listingBids.length - 1];
    if (latestBid === undefined) {
    res.redirect('/error');
    } else {
       const profile = await getProfile(req.session.userName, req.session.token);
    res.render('details', { listing, profile }); 
    }
});

router.get('/:id/update', async (req, res) => {
    id = req.params.id;
    listing = await getOneListing( id, req.session.token);
    res.render('update', { id, failedMessage: req.flash('errorMessage')  });
})

router.put('/:id', async (req, res) => {
    id = req.params.id;
    updatedListing = req.body;
    listing = await getOneListing( id, req.session.token);
    success = await updateListing (updatedListing, id, req.session.token);
    if (!success) {
        req.flash('errorMessage', 'Something went wrong. Please try again');
        res.render('update', { id, failedMessage: req.flash('errorMessage')  });
    } else {
        res.redirect('/profile')
    }
});

router.delete('/:id', async (req,res) => {
    id = req.params.id;
    deletedListing = await deleteListing( id, req.session.token);
    res.redirect('/profile');
});

router.post('/new', async(req, res) => {
    const listingData = req.body;
    success = await createListing(listingData, req.session.token);
    if (!success) {
        res.redirect('/error')
    } else {
        res.redirect('/profile');
    }
});


module.exports = router;

