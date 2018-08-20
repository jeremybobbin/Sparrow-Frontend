import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Context from './Context';


export default ({component: Component, authenticated, ...rest}) => (
    <Context.Consumer>
    {(context) => (
        <React.Fragment>
            <Route
                {...rest}
                render={(props) => context.state.loggedIn === true
                    ? <Component {...props} {...rest} />
                    : <Redirect to='/login' />} />
        </React.Fragment>
    )}
    </Context.Consumer>
);