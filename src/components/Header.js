import React from 'react';
import {NavLink} from 'react-router-dom';

import LogButton from './LogButton';
import Username from './Username';
import Message from './Message';

import '../css/components/navbar.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        const isOpen = !this.state.isOpen;
        this.setState({isOpen});
    }

    render() {
        return (
            <header>
                <nav className='navbar'>
                    <div className='top-container'>
                        <Hamburger isOpen={this.state.isOpen} onClick={() => this.toggle()}/>
                        <Username />
                    </div>
                    <div className={`link-list-container ${this.state.isOpen ? 'open' : 'closed'}`}>
                        <ul className='link-list'>
                            <li><NavLink exact to="/dashboard">Dashboard</NavLink></li>
                            <li><NavLink exact to="/leads">Leads</NavLink></li>
                            <li><NavLink exact to="/register">Register</NavLink></li>
                            <li><LogButton /></li>
                        </ul>
                    </div>
                </nav>
                <Message />
            </header>
        );
    }
}




const Hamburger = props =>
    !props.isOpen ?
    <svg className='hamburger' height="32px" onClick={(e) => props.onClick(e)} viewBox="0 0 32 32" width="32px"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
    :
    <svg className='x-button' height="32px" width="32px" onClick={(e) => props.onClick(e)} viewBox="0 0 47.971 47.971"><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"></path></svg>