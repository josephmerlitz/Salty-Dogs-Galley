import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Description from '../Description';
import Carousel from '../Carousel';
import Footer from '../Footer';
import MenuItems from '../MenuItems';
import PlaceOrder from '../PlaceOrder';
import Cart from '../Cart';
import Navbar from '../Navbar';
import CheckoutFormLoader from '../CheckoutFormLoader';
import HeaderSection from '../HeaderSection';

export default class index extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Navbar />
                        <HeaderSection bgUrl={{ backgroundImage: "url(213074.jpg)", height: "820px" }} />
                        <Description />
                        <Carousel />
                        <Footer />
                    </Route>
                    <Route path="/home">
                        <Navbar />
                        <HeaderSection bgUrl={{ backgroundImage: "url(213074.jpg)", height: "820px" }} />
                        <Description />
                        <Carousel />
                        <Footer />
                    </Route>
                    <Route path="/menu">
                        <Navbar />
                        <HeaderSection bgUrl={{ backgroundImage: "url(213074.jpg)", height: "250px" }} />
                        <MenuItems />
                        <Footer />
                    </Route>
                    <Route path="/placeOrder">
                        <Navbar />
                        <HeaderSection bgUrl={{ backgroundImage: "url(213074.jpg)", height: "250px" }} />
                        <PlaceOrder />
                        <Footer />
                    </Route>
                    <Route path="/cart">
                        <Navbar />
                        <HeaderSection bgUrl={{ backgroundImage: "url(213074.jpg)", height: "250px" }} />
                        <Cart />
                        <Footer />
                    </Route>
                    <Route path="/checkout">
                        <CheckoutFormLoader />
                    </Route>
                    <Route path="/manager" component={() => window.location = 'http://google.com'} />
                    <Route component={() => window.location = '/'} />
                </Switch>
            </Router>
        )
    }
}
