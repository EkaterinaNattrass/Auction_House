const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');

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

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/listings', (req, res) => {
    res.render('listings')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/details', (req, res) => {
    res.render('details')
})




app.listen(3000, () => {console.log('listening on port')});