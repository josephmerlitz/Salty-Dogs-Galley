import React, { Component, createContext } from 'react';

export const CartContext = createContext();

class CartContextProvider extends Component {
    state = {
        cartItemsCount: 0,
        cartItems: []
    }

    incItems = (id, dishPrice, dishName) => {
        let cartItemsArray = this.state.cartItems;
        cartItemsArray.push({ id, dishPrice, dishName });
        this.setState({ cartItemsCount: this.state.cartItemsCount + 1, cartItems: cartItemsArray });
    }

    decItems = (id, dishPrice, dishName) => {
        if (this.state.cartItemsCount > 0) {
            let cartItemsArray = this.state.cartItems;
            for (var i = 0; i < cartItemsArray.length; i++) {
                if (cartItemsArray[i].id === id) {
                    cartItemsArray.splice(i, 1);
                    this.setState({ cartItemsCount: this.state.cartItemsCount - 1, cartItems: cartItemsArray });
                    return;
                }
            }
        }
    }

    emptyOutCart = () => {
        this.setState({ cartItemsCount: 0, cartItems: [] });
    }

    render() {
        return (
            <CartContext.Provider value={{ ...this.state, incItems: this.incItems, decItems: this.decItems, emptyOutCart: this.emptyOutCart }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartContextProvider;
