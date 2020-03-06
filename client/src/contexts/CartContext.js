import React, { Component, createContext } from 'react';

export const CartContext = createContext();

class CartContextProvider extends Component {
    state = {
        cartItemsCount: 0,
        cartItems: []
    }

    incItems = () => {
        this.setState({ cartItemsCount: this.state.cartItemsCount + 1 });
    }

    decItems = () => {
        if (this.state.cartItemsCount > 0) {
            this.setState({ cartItemsCount: this.state.cartItemsCount - 1 });
        }
    }

    setCartItems = (item) => {
        let items = [...this.state.cartItems];
        items.push(item);
        this.setState({ cartItems: items });
    }

    render() {
        return (
            <CartContext.Provider value={{ ...this.state, incItems: this.incItems, decItems: this.decItems, setCartItems: this.setCartItems }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartContextProvider;
