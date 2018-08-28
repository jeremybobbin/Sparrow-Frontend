import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header 
                    message={this.props.message}
                    username={this.props.username}    
                />
                    <main className={this.props.className}>
                        {this.props.children}
                    </main>
                <Footer/>
            </React.Fragment>
        );
    }
}