'use strict';

const express = require('express');
const YouTube = require('youtube-api');

const router = express.Router();

let settings = null
try {
  settings = require('./../settings');
} catch(err) {
  settings = require('./../../../data/settings.js');
}


// Authenticate YouTube using API Key
YouTube.authenticate({
  type: 'key',
  key: settings.YOUTUBE_API_KEY,
});

router.post('/search/list', (req, res) => {
  YouTube.search.list(req.body, (err, data) => { res.json(data); });
});

router.post('/videos/list', (req, res) => {
  YouTube.videos.list(req.body, (err, data) => {
    res.json(data);
  });
});


module.exports = router;
