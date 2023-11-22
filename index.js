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

app.get('/login-form', async (req, res) => {
    res.redirect('listings');
})

app.post('/login-form', async(req, res) => {

    const loggedInUser = await loginUser(req.body);

    if (loggedInUser.success) {
        req.session.token = loggedInUser.token;
        req.session.userName = loggedInUser.userName;
        req.session.credits = loggedInUser.credits;
        req.session.avatar = loggedInUser.avatar;
        res.render('listings');
    } else {
        // req.flash ('loginError', loggedInUser.error + '...Something went wrong. Please, try again');
        res.redirect('/');
    }
});

app.get('/register', (req, res) => {
    res.render('register', {
        failedRegisterMessage: req.flash('registerError')
    })
});

app.get('/register-form', async(req, res) => {
    res.redirect('/register')
});

app.post('/register-form', async(req, res) => {

    const registeredUser = await registerUser(req.body);

    if(!registeredUser.success) {
        req.flash('registerError', registeredUser.error + '...Something went wrong. Please, try again');
        res.redirect('/listings');
        return;
    }
})

app.get('/listings', async (req, res) => {
    const listings = await getListings();
    console.log(listings);
    res.render('listings', { listings })
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/details', (req, res) => {
    res.render('details')
})

app.get('/about', (req, res) => {
    res.render('about')
})




app.listen(3000, () => {console.log('listening on port')});