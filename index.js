const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');

const loginUser = require('./modules/login');
const registerUser = require('./modules/register');
const getListings = require('./modules/getListings');
const getOneListing = require('./modules/getOneListing');
const getProfile = require('./modules/getProfile');
const getProfileListings = require('./modules/getProfileListings');
const createListing = require('./modules/createListing');
const updateListing = require('./modules/updateListing');
const deleteListing = require('./modules/delete');
const AppError = require('./modules/AppError');
const catchAsync = require('./modules/catchAsync');

const fetch = (...args) => import ('node-fetch').then(({default : fetch}) => fetch(...args));

app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true, 
    outputStyle: 'compressed',
    force: [true]
}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'bid-beautifully',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,
    }
}));

app.use(flash());

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index', {
        failedLoginMessage: req.flash('LoginError')
    })
});

app.get('/login-form', catchAsync(async (req, res) => {
    res.redirect('profile');
}));

app.post('/login-form', catchAsync(async(req, res) => {

    const loggedInUser = await loginUser(req.body);

    if (loggedInUser.success) {
        req.session.token = loggedInUser.token;
        req.session.userName = loggedInUser.userName;
        res.redirect('profile');
    } else {
        // req.flash ('loginError', loggedInUser.error + '...Something went wrong. Please, try again');
        res.redirect('/');
    }
}));

app.get('/register', (req, res) => {
    res.render('register', {
        failedRegisterMessage: req.flash('registerError')
    })
});

app.get('/register-form', catchAsync(async(req, res) => {
    res.redirect('/register')
}));

app.post('/register-form', catchAsync(async(req, res) => {

    const registeredUser = await registerUser(req.body);
    res.redirect('profile');

    if(!registeredUser.success) {
        req.flash('registerError', registeredUser.error + '...Something went wrong. Please, try again');
        return;
    }
}));

app.get('/listings', catchAsync(async (req, res) => {
    const listings = await getListings();
    const profile = await getProfile(req.session.userName, req.session.token)
    res.render('listings', { listings, profile })
}));

app.get('/listings/:id', catchAsync(async(req,res) => {
    id = req.params.id;
    const listing = await getOneListing(id);
    res.render('details', { listing });
}));

app.get('/profile', catchAsync(async (req, res) => {
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    const listings = profile.listings;
    res.render('profile', { profile, listings })
}));

app.post('/create-listing', catchAsync(async(req, res, next) => {
    const listingData = req.body;
    success = createListing(listingData, req.session.token);
    res.redirect('profile');
}));

app.get('/listings/:id/update', async (req, res) => {
    id = req.params.id;
    listing = await getOneListing( id, req.session.token);
    res.render('update', { id });
})

app.put('/listings/:id', async (req, res) => {
    id = req.params.id;
    updatedListing = req.body;
    success = await updateListing (updatedListing, id, req.session.token);
    res.redirect('/profile');
})

app.delete('/listings/:id', async (req,res) => {
    id = req.params.id;
    deletedListing = await deleteListing( id, req.session.token);
    res.redirect('/profile');
})

app.get('/about', (req, res) => {
    res.render('about')
})

/* app.all('*', (req, res, next) => {
    next(new AppError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, Something went wrong!'
    res.status(statusCode).render('error');
}) */

app.listen(3000, () => {console.log('listening on port')});