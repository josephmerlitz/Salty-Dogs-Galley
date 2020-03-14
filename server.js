const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();

const PORT = process.env.PORT || 6000;

//connect to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);








app.get("/public-key", (req, res) => {
    res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.get("/product-details", (req, res) => {
    let data = getProductDetails();
    res.send(data);
});

app.post("/create-payment-intent", async (req, res) => {
    const body = req.body;
    console.log(Number(req.body.amount).toFixed(2));
    const productDetails = getProductDetails();

    const options = {
        payment_method_types: ['card'],
        amount: Number(req.body.amount).toFixed(2) * 100,
        currency: 'USD',
        receipt_email: 'hamza.hamdan@hotmail.com'
    };

    try {
        const paymentIntent = await stripe.paymentIntents.create(options);
        res.json(paymentIntent);
    } catch (err) {
        res.json(err);
    }
});

let getProductDetails = () => {
    return { currency: "EUR", amount: 9900 };
};



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}





app.listen(PORT, console.log(`Server is listening on port ${PORT}`));