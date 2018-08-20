import React from 'react';
import {NavLink} from 'react-router-dom';

import Hamburger from './Hamburger';
import LogButton from './LogButton';
import Username from './Username';

import '../css/components/navbar.css';




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
            <nav className='navbar'>
                <div className='top-container'>
                    <Hamburger isOpen={this.state.class === 'closed' ? false : true} onClick={() => this.toggle()}/>
                    <Username />
                </div>
                <div className={`link-list-container ${this.state.class}`}>
                    <ul className='link-list'>
                        <li><NavLink exact to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink exact to="/leads">Leads</NavLink></li>
                        <li><NavLink exact to="/register">Register</NavLink></li>
                        <li><LogButton /></li>
                    </ul>
                </div>
            </nav>
        );
    }
}













