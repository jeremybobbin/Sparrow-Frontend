import React from 'react';


import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header
                    redirect={(path) => this.props.redirect(path)}
                    message={this.props.message}
                    username={this.props.username}
                    isLoggedIn={this.props.isLoggedIn}
                />
                    <main className={this.props.className}>
                        {this.props.children}
                    </main>
                <Footer/>
            </React.Fragment>
        );
    }
}