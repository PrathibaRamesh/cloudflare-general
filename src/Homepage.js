import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

function Homepage() {
    return (
        <div className="homepage">
            <h1>General Assesment - Prathiba Ramesh</h1>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/domain" className="nav-button">
                            Popular Domains
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ddosAttack" className="nav-button">
                            DDOS Attack
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trafficChange" className="nav-button">
                            Traffic Change
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Homepage;


