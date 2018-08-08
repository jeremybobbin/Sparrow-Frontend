import React from 'react';

import Context from './Context';

const Register = props =>
    <Context.Consumer>
        {(context) => (
            <React.Fragment>
                <button 
                    className={`props.className ${context.state.loggedIn ? 'hidden' : ''}`}
                    onClick={(e) => {
                        if(context.state.loggedIn) context.logOut();
                        context.register(props.email, props.password, props.first, props.last);
                    }}>Register</button>
            </React.Fragment>
        )}
    </Context.Consumer>;

export default Register;

