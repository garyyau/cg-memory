'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = process.env;

const youtubeRoutes = require('./routes/youtube.routes');

const app = express();

app.use(express.static('dist'));
app.use('/images', express.static(path.join(__dirname, '../app/images')));
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/* GET home page. */
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use('/youtube', youtubeRoutes);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
