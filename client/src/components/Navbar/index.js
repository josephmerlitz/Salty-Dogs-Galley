import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import { CartContext } from '../../contexts/CartContext';

class Navbar extends Component {

    render() {
        return (
            <CartContext.Consumer>{(context) => {

                console.log(context);

                const { cartItemsCount } = context;

                return (

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
                                    <Link to="/cart">Cart<h5 style={{ display: "inline" }}><span className="badge badge-light ml-1" style={{ position: "absolute" }}>{cartItemsCount} Item(s)</span></h5></Link>
                                </li>
                            </ul>
                        </nav>


                    </div>

                )
            }}</CartContext.Consumer>
        );

    }
}

export default Navbar;