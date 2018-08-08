import React from 'react';
import { Route } from 'react-router-dom';

import Context from './Context';

const LogButton = props =>
    <Context.Consumer>
        {(context) => (
            <React.Fragment>
                <Route render={({ history }) => (
                    <button 
                        className={props.className}
                        onClick={(e) => {
                            if(context.state.loggedIn) context.logOut();
                            else if (props.email === undefined && props.password === undefined) history.push('/login');
                            else context.logIn(props.email, props.password);
                        }}
                    >
                        {context.state.loggedIn ? 'Log Out' : 'Log In'}
                    </button>
                )} />
            </React.Fragment>
        )}
    </Context.Consumer>;

export default LogButton;

