const user_controller = require('./controllers/user_controller');
const bar_controller = require('./controllers/bar_controller');
const deal_controller = require('./controllers/deal_controller');
const review_controller = require('./controllers/review_controller');
const express = require('express');

const app = express();
app.use('/user', user_controller);
app.use('/bar', bar_controller);
app.use('/deal', deal_controller);
app.use('/review', review_controller);

module.exports = app;