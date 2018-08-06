import React from 'react';
import {NavLink} from 'react-router-dom';
import Hamburger from './Hamburger';
import '../css/components/navbar.css';
import { resolve } from 'path';




export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            class: 'closed'
        }
    }

    set(callback) {
        return new Promise(resolve => this.setState(callback(this.state), resolve()));
    }

    toggle = () => {
        this.set(s => {
            s.class = s.class === 'open' ? 'closed' : 'open'
            return s;
        });
    }

    render () {
        return (
            <nav>
                <Hamburger onClick={() => this.toggle()}/>
                <div className={this.state.class}>
                    <ul>
                        <li><NavLink exact to="/">Dashboard</NavLink></li>
                        <li><NavLink exact to="/login">Login</NavLink></li>
                        <li><NavLink exact to="/register">Register</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}













