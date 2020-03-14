const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const OrderItem = require('../models/Order');

router.get('/menuItems', (req, res, next) => {
    MenuItem.find({}).then(data => res.json(data)).catch(next);
});

router.get('/menuItems/:id', (req, res, next) => {
    MenuItem.findById(req.params.id).then(data => res.json(data)).catch(next);
});

router.post('/newOrder', (req, res, next) => {

    let orderItem = {
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        orderId: req.body.orderId,
        orderDetails: req.body.orderDetails,
        customerPhone: req.body.customerPhone,
        orderStatus: 'Pending'
    };

    OrderItem.create(orderItem).then(data => res.json(data)).catch(next);

});

module.exports = router;