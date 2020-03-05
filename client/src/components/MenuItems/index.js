import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuitems: []
        }
    }

    componentDidMount() {
        this.getMenuItem();
    }

    getMenuItem = () => {
        axios.get('/api/menuItems')
            .then((res) => {
                console.log(res.data);
                this.setState({ menuitems: res.data });
            })
            .catch((err) => console.log(err));

    }

    render() {
        return (
            <div className="row m-3">
                {this.state.menuitems.map(item => (
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" style={{ width: "100%" }}>
                        <div className="card m-3" style={{ width: "18rem" }} key={item._id}>
                            <img src={item.imgSrc} alt={item.imgSrc} class="card-img-top" style={{ height: "18rem" }} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.dishDetails}</p>
                                <p className="card-text">{item.dishPrice}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default MenuItem;