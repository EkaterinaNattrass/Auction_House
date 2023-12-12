const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const BearerStrategy = require ('passport-http-bearer');

const getListings = require('./modules/getListings');
const getProfile = require('./modules/getProfile');

const listings = require('./routes/listings');
const loginForm = require('./routes/loginForm');
const registerForm = require('./routes/registerForm');
const logout = require('./routes/logout');
const profile = require('./routes/profile');

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
    /* cookie: {
        maxAge: 7200000,
    } */
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

app.use(flash());

app.use(methodOverride('_method'));

app.use('/login-form', loginForm);
app.use('/register-form', registerForm);
app.use('/listings', listings);
app.use('/logout', logout);
app.use('/profile', profile);

app.get('/', (req, res) => {
    res.render('index', {
        failedLoginMessage: req.flash('loginError')
    })
});

app.get('/listings-loggedin', async (req, res) => {
    const listings = await getListings();
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    res.render('listings-loggedin', { listings, profile })
});

app.get('/listings-loggedin/search', async (req, res) => {
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

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {console.log('listening on port')});