import React from 'react';
import Navbar from './Navbar';
import Message from './Message';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Navbar/>
                <Message />
            </header>
        );
    }
}