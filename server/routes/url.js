const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require('../models/Url'); // Go up one level to models

// @route   POST /api/shorten
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!validUrl.isUri(originalUrl)) return res.status(401).json('Invalid URL');

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) return res.json(url);

    const shortCode = nanoid(6);
    url = new Url({ originalUrl, shortCode });
    await url.save();
    res.json(url);
  } catch (err) {
    res.status(500).json('Server error');
  }
});

// @route   GET /api/urls (Needed for Recent Activity table)
router.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json('Server error');
  }
});

// @route   DELETE /api/urls/:id (Needed for the Action button)
router.delete('/urls/:id', async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json('Server error');
  }
});

// @route   GET /:code (Redirection logic)
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    }
    res.status(404).json('Not found');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;