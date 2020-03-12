import React, { Component } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../CartItem';

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
            <div className="container mt-4">

                <ul className="list-group">
                    {
                        objectsArray.map(item => <CartItem key={item.id} itemId={item.id} itemCount={item.count} />)
                    }
                    {
                        <li className="list-group-item">
                            {
                                objectsArray.length
                                    ? (
                                        <div className="text-center">
                                            <h3>Order Total Amount: ${sum.toFixed(2)}</h3>
                                            <button className="btn btn-dark m-3 px-5 py-2" style={{ width: "250px" }}><span style={{ fontSize: "20px", }}>Place Order</span></button>
                                            <button className="btn btn-dark m-3 px-5 py-2" onClick={() => emptyOutCart()} style={{ width: "250px" }}><span style={{ fontSize: "20px" }}>Cancel Order</span></button>
                                        </div>
                                    )
                                    : <h3 className="text-center">Cart is Empty!</h3>
                            }
                        </li>
                    }

                </ul>

            </div>
        )
    }
}

export default Cart;