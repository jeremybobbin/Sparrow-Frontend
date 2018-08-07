import React from 'react';
import { Redirect } from 'react-router'

import Context from './Context';

const LogButton = props =>
    <Context.Consumer>
        {(context) => (
            <React.Fragment>
                <button 
                    className={props.className}
                    onClick={(e) => {
                        console.log(props.email);
                        if(context.state.loggedIn) context.logOut();
                        else if (props.email === undefined && props.password === undefined) <Redirect to="/login"/>
                        else context.logIn(props.email, props.password);
                    }}
                >
                    {context.state.loggedIn ? 'Log Out' : 'Log In'}
                </button>
            </React.Fragment>
        )}
    </Context.Consumer>;

export default LogButton;

