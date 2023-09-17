const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello Ryan!'));
// router.get('/ryan', (req, res) => res.send('Hello Ryan!'));

router.use('/contacts', require('./contacts'));

module.exports = router;