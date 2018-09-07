import React from 'react';

export default class Logout extends React.Component {

    componentWillMount() {
        this.props.logOut();
    }

    render() {
        return (
            <React.Fragment />
        );
    }
}