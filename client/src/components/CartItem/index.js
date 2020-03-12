import React, { Component } from 'react';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';

class CartItem extends Component {

    static contextType = CartContext;

    state = {
        id: '',
        name: '',
        dishDetails: '',
        imgSrc: '',
        dishPrice: '',
        itemCount: 0,
        totalCost: "$0"
    }

    componentDidMount() {
        this.getItemDetails(this.props.itemId);
    }

    getItemDetails = (id) => {
        axios.get(`/api/menuItems/${id}`).then((res) => {
            this.setState({ id: res.data._id, name: res.data.name, dishDetails: res.data.dishDetails, imgSrc: res.data.imgSrc, dishPrice: res.data.dishPrice, itemCount: this.props.itemCount, totalCost: this.getTotalCost(res.data.dishPrice, this.props.itemCount) });
        }).catch((err) => console.log(err));
    }

    getTotalCost = (costPerItem, quantity) => {
        let totalCost = costPerItem.replace('$', '');
        return parseFloat(totalCost) * parseInt(quantity);
    }

    render() {

        const { incItems, decItems } = this.context;

        return (

            <div>
                <li className="list-group-item" key={this.props.itemId}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={this.state.imgSrc} style={{ width: "200px", height: "200px" }} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.name}</h5>
                                <p className="card-text">Price: {this.state.dishPrice}</p>

                                <div className="row my-2">
                                    <div className="col-2 text-left"><button style={{ width: "40px" }} className="btn btn-light text-center" onClick={() => {
                                        if (this.state.itemCount > 0) {
                                            this.setState({ itemCount: this.state.itemCount - 1, totalCost: this.getTotalCost(this.state.dishPrice, this.state.itemCount - 1) });
                                            decItems(this.props.itemId);
                                        }
                                    }}>-</button></div>
                                    <div className="col-2 text-center"><h3>{this.state.itemCount}</h3></div>
                                    <div className="col-2 text-right"><button style={{ width: "40px" }} className="btn btn-light text-center" onClick={() => {
                                        this.setState({ itemCount: this.state.itemCount + 1, totalCost: this.getTotalCost(this.state.dishPrice, this.state.itemCount + 1) });
                                        incItems(this.props.itemId, this.state.dishPrice);
                                    }}>+</button></div>
                                </div>

                                <h6 className="card-text">Total Cost ${parseFloat(this.state.totalCost).toFixed(2)}</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}

export default CartItem;