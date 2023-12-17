# Auction_House
A semester project for Noroff

# Project details

A website for people who are interested in buying and selling antiques. The target group is middle-aged people who look for affordable luxury and prestige and items with history.

## Prerequisites

Express
EJS
Path
Bootstrap
SASS
Body-parser
Connect-flash
Express-session
Method-override
Node-fetch
Passport

##  Project setup

In order to install these NPM packages run the following command (in the project root directory):

- `npm install`

## Run

In order to run the site locally, undertake the following steps (from the project root directory):

- `node index.js`
- Navigate to `localhost:3000/` in your web browser
- You can browse through listings without having to register, but in order to be able to get the details of a listing or bid on it, you need to register and log in
- Register with a name, email and password
- Log in with your noroff email and password

## Heroku deployment

The app is deployed to Heroku at [https://noroff-auction-house-80f72f8a1683.herokuapp.com/](https://noroff-auction-house-80f72f8a1683.herokuapp.com/). Heroku was chosen over Netlify or GitHub Pages because the application relies on a backend built using Express, making Heroku more suitable for hosting dynamic server-side logic alongside static files.