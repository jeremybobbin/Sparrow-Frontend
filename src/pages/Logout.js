import React from 'react';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.logOut();
    }

    render() {
        return (
            <React.Fragment />
        );
    }
}