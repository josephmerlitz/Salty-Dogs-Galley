import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row-flex">
                    <div className="flex-column-form text-center">
                        <h3>Social Media</h3>
                        <p>
                            <a href="https://">
                                <img src="facebook.png" alt="facebook" />
                            </a>
                            <a href="https://">
                                <img src="instagram.png" alt="instagram" />
                            </a>
                            <a href="https://">
                                <img src="twitter.png" alt="twitter" />
                            </a>
                        </p>

                    </div>
                    <div className="opening-time text-center">
                        <h3>Open Hours</h3>
                        <p>
                            <span>Monday-Thursday: 11AM-10PM</span>
                            <span>Friday-Saturday: 11AM-12AM </span>
                            <span>Sunday: 10AM-12AM</span>
                        </p>
                    </div>
                    <div className="contact-number text-center">
                        <h3>Contact</h3>
                        <p>
                            <span>210-555-0000</span>
                        </p>
                    </div>
                    <div className="address text-center">
                        <h3>Location</h3>
                        <span>498 Pacific Ave</span>
                        <p>
                            <span>San Antonio, TX</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;