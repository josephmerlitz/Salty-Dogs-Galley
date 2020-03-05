import React, { Component } from 'react'

class PlaceOrderItem extends Component {

    state = {
        itemCount: 0
    }

    incCount = () => {
        this.setState({ itemCount: this.state.itemCount + 1 })
    }

    decCount = () => {
        if (this.state.itemCount > 0) {
            this.setState({ itemCount: this.state.itemCount - 1 })
        }
    }

    render() {
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" style={{ width: "100%" }}>
                <div className="card m-3" style={{ width: "18rem" }} key={this.props.item._id}>
                    <img src={this.props.item.imgSrc} alt={this.props.item.imgSrc} class="card-img-top" style={{ height: "18rem" }} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.item.name}</h5>
                        <p className="card-text">{this.props.item.dishDetails}</p>
                        <p className="card-text">{this.props.item.dishPrice}</p>
                        <div className="row">
                            <div className="col-4 text-right"><button style={{ width: "40px" }} className=" btn btn-light text-center" onClick={this.decCount}>-</button></div>
                            <div className="col-4 text-center"><h3>{this.state.itemCount}</h3></div>
                            <div className="col-4  text-left"><button style={{ width: "40px" }} className=" btn btn-light text-center" onClick={this.incCount}>+</button></div>
                        </div>
                        {/* <div className="mt-3 justify-content-center text-center"><button className=" btn btn-primary text-center">Add Item(s)</button></div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceOrderItem;