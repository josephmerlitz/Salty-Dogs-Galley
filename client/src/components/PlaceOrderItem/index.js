import React, { Component } from 'react';
import { CartContext } from '../../contexts/CartContext';

class PlaceOrderItem extends Component {

    static contextType = CartContext;

    state = {
        itemCount: 0
    }

    incCount = () => {
        this.setState({ itemCount: this.state.itemCount + 1 });
    }

    decCount = () => {
        this.setState({ itemCount: this.state.itemCount - 1 });
    }

    render() {
        const { incItems, decItems } = this.context;
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" style={{ width: "100%" }} key={this.props.item._id}>
                <div className="card m-3" style={{ width: "18rem" }}>
                    <img src={this.props.item.imgSrc} alt={this.props.item.imgSrc} className="card-img-top" style={{ height: "18rem" }} />
                    <div className="card-body">
                        <h5 className="card-title fontStyler">{this.props.item.name}</h5>
                        <p className="card-text fontStyler">{this.props.item.dishDetails}</p>
                        <p className="card-text fontStyler">{this.props.item.dishPrice}</p>
                        <div className="row">
                            <div className="col-4 text-right"><button style={{ width: "40px" }} className=" btn btn-light text-center" onClick={() => {
                                if (this.state.itemCount > 0) {
                                    this.decCount();
                                    decItems(this.props.item._id, this.props.item.dishPrice);
                                }
                            }}>-</button></div>
                            <div className="col-4 text-center fontStyler"><h3>{this.state.itemCount}</h3></div>
                            <div className="col-4  text-left"><button style={{ width: "40px" }} className="btn btn-light text-center" onClick={() => {
                                this.incCount();
                                incItems(this.props.item._id, this.props.item.dishPrice);
                            }}>+</button></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceOrderItem;