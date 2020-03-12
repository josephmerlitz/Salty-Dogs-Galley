const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/menuItems', (req, res, next) => {
    MenuItem.find({}).then(data => res.json(data)).catch(next);
});

router.get('/menuItems/:id', (req, res, next) => {
    MenuItem.findById(req.params.id).then(data => res.json(data)).catch(next);
});

module.exports = router;