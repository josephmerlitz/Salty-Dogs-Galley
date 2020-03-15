import React, { Component } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../CartItem';
import { Link } from 'react-router-dom';
import './style.css';

class Cart extends Component {

    static contextType = CartContext;

    render() {
        const { cartItems, emptyOutCart } = this.context;

        let objectsArray = [];

        //return unique values from cartItems array

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        };

        let cartItemsIds = cartItems.map(item => {
            return item.id;
        });

        let uniqueValuesArray = cartItemsIds.filter(onlyUnique);

        uniqueValuesArray.forEach(element => {
            let count = 0;
            cartItemsIds.forEach(item => {
                if (item === element) {
                    count++;
                }
            });
            objectsArray.push({ id: element, count: count });
        });

        let sum = 0;
        cartItems.map(element => sum = (parseFloat(sum) + parseFloat(element.dishPrice.replace('$', ''))));

        return (
            <div className="container my-3">

                <ul className="list-group">
                    {
                        objectsArray.sort(
                            function (x, y) {
                                var a = x.id.toUpperCase(),
                                    b = y.id.toUpperCase();
                                if (a > b) {
                                    return 1;
                                }
                                if (a < b) {
                                    return -1;
                                }
                                return 0;
                            }
                        ).map(item => <CartItem key={item.id} itemId={item.id} itemCount={item.count} />)
                    }
                    {
                        <li className="list-group-item">
                            {
                                objectsArray.length
                                    ? (
                                        <div className="text-center">
                                            <div className="row">
                                                <div className="col-6"><h3 className="text-right fontStyler">Subtotal:</h3></div>
                                                <div className="col-6"><h3 className="text-left fontStyler">${sum.toFixed(2)}</h3></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6"><h3 className="text-right fontStyler">Tax:</h3></div>
                                                <div className="col-6"><h3 className="text-left fontStyler">${(sum.toFixed(2) * 10 / 100).toFixed(2)}</h3></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12"><hr /></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6"><h3 className="text-right fontStyler">Total:</h3></div>
                                                <div className="col-6"><h3 className="text-left fontStyler">${(sum + sum * 10 / 100).toFixed(2)}</h3></div>
                                            </div>
                                            {/* <button className="btn btn-dark m-3 px-5 py-2" style={{ width: "250px" }}><span style={{ fontSize: "20px", }}>Place Order</span></button> */}
                                            <Link to="/checkout" className="btn btn-dark m-3 px-5 py-2" style={{ width: "250px" }}><span style={{ fontSize: "20px", }}>Place Order</span></Link>
                                            <button className="btn btn-dark m-3 px-5 py-2" onClick={() => emptyOutCart()} style={{ width: "250px" }}><span style={{ fontSize: "20px" }}>Cancel Order</span></button>
                                        </div>
                                    )
                                    : (
                                        <div className="text-center">
                                            <h3 className="bagIsEmpty">Bag is Empty!</h3>
                                            <img src="empty-order.png" className="emptyBagImage mx-auto" alt="bag is empty" />
                                        </div>
                                    )
                            }
                        </li>
                    }

                </ul>

            </div>
        )
    }
}

export default Cart;