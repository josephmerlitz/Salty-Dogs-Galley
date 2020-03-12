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

export default class index extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Navbar />
                        <Description />
                        <Carousel />
                        <Footer />
                    </Route>
                    <Route path="/home">
                        <Navbar />
                        <Description />
                        <Carousel />
                        <Footer />
                    </Route>
                    <Route path="/menu">
                        <Navbar />
                        <MenuItems />
                        <Footer />
                    </Route>
                    <Route path="/placeOrder">
                        <Navbar />
                        <PlaceOrder />
                        <Footer />
                    </Route>
                    <Route path="/cart">
                        <Navbar />
                        <Cart />
                        <Footer />
                    </Route>
                    <Route path="/manager" component={() => window.location = 'http://google.com'} />
                    <Route component={() => window.location = '/'} />
                </Switch>
            </Router>
        )
    }
}
