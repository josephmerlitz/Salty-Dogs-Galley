const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/menuItems', (req, res, next) => {
    MenuItem.find({}).then(data => res.json(data)).catch(next);
});

module.exports = router;