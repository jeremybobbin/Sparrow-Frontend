import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                    {this.props.children}
                <Footer/>
            </React.Fragment>
        );
    }
}