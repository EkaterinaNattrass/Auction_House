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
const getProfileListings = require('./modules/getProfileListings');
const updateAvatar = require('./modules/updateAvatar');

const listings = require('./routes/listings');
const loginForm = require('./routes/loginForm');
const registerForm = require('./routes/registerForm');
const logout = require('./routes/logout');

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

app.get('/profile', async (req, res) => {
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    const listings = profile.listings;
    res.render('profile', { profile, listings })
});

app.put('/profile/update', async (req, res) => {
    avatar = req.body;
    userName = req.session.userName;
    const updatedAvatar = await updateAvatar(avatar, userName, req.session.token);
    const profile = await getProfile(req.session.userName, req.session.token);
    const listings = profile.listings;
    console.log(updatedAvatar);
    res.render('profile', { profile, avatar, listings })
})

app.get('/about', (req, res) => {
    res.render('about')
})




app.listen(3000, () => {console.log('listening on port')});