import React, { Component } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../CartItem';

class Cart extends Component {

    static contextType = CartContext;

    render() {
        const { /* cartItemsCount, */ cartItems } = this.context;
        //console.log(cartItemsCount);
        console.log("cartItems##############: " + cartItems);

        //return unique values, then find the count and push to the new array
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

                <ul class="list-group">
                    {
                        objectsArray.map(item => <CartItem itemId={item.id} itemCount={item.count} />)
                    }
                    {
                        <li className="list-group-item">
                            {objectsArray.length ? <h3 className="text-center">Total Amount: {sum}
                            </h3> : <h3 className="text-center">Cart is Empty!</h3>}
                        </li>
                    }

                </ul>

            </div>
        )
    }
}

export default Cart;