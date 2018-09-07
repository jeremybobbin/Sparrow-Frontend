import React from 'react';


import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                    <Header/>
                    <main className={this.props.className}>
                        {this.props.children}
                    </main>
                <Footer/>
            </React.Fragment>
        );
    }
}