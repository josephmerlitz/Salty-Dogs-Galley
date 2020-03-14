import React, { Component } from 'react';
import './style.css';

export default class HeaderSection extends Component {



    render() {
        return (
            <section className="section-intro" style={this.props.bgUrl}>
                <header>
                    <h1 className="fontStyler">Salty Dog's Galley</h1>
                </header>
            </section>
        )
    }
}
