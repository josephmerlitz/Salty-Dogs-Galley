import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Description from '../Description';
import Carousel from '../Carousel';
import Footer from '../Footer';
import MenuItems from '../MenuItems';
import './style.css';
import PlaceOrder from '../PlaceOrder';
import { CartContext } from '../../contexts/CartContext';
import Cart from '../Cart';

class Navbar extends Component {



    render() {
        return (
            <CartContext.Consumer>{(context) => {

                console.log(context);

                const { cartItemsCount } = context;

                return (<Router>
                    <div>
                        <nav>
                            <ul className="nav-flex-row">
                                <li className="nav-item">
                                    <Link to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/menu">Menu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/placeOrder">Place Order</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart">Cart<h5 style={{ display: "inline" }}><span class="badge badge-light ml-1" style={{ position: "absolute" }}>{cartItemsCount}</span></h5></Link>
                                </li>
                            </ul>
                        </nav>

                        <section className="section-intro" style={{ backgroundImage: "url(213074.jpg)" }}>
                            <header>
                                <h1>Salty Dog's Galley</h1>
                            </header>
                        </section>

                        <Switch>
                            <Route exact path="/">
                                <Description />
                                <Carousel />
                                <Footer />
                            </Route>
                            <Route path="/home">
                                <Description />
                                <Carousel />
                                <Footer />
                            </Route>
                            <Route path="/menu">
                                <MenuItems />
                                <Footer />
                            </Route>
                            <Route path="/placeOrder">
                                <PlaceOrder />
                                <Footer />
                            </Route>
                            <Route path="/cart">
                                <Cart />
                                <Footer />
                            </Route>
                        </Switch>

                    </div>
                </Router>)
            }}</CartContext.Consumer>
        );

    }
}

export default Navbar;