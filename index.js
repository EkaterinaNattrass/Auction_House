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

const listings = require('./routes/listings');
const loginForm = require('./routes/loginForm');
const registerForm = require('./routes/registerForm');
const logout = require('./routes/logout');
const profile = require('./routes/profile');
const listingsLoggedin = require('./routes/listings-loggedin');

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
        maxAge: 7200000,
    }
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
app.use('/listings-loggedin', listingsLoggedin);

app.get('/', (req, res) => {
    res.render('index', {
        failedLoginMessage: req.flash('loginError'),
        successMessage: req.flash('success')
    })
});

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {console.log('listening on port')});