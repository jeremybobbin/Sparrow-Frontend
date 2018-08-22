import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Context from './Context';
import CampaignList from './CampaignList';

const dev = process.env.NODE_ENV === 'development';

export default ({component: Component, ...rest}) => (
    <Context.Consumer>
        {(context) => (
            <React.Fragment>
                <Route {...rest}
                    render={(props) => {
                        return context.state.loggedIn === true || dev
                        ? <Component {...props} {...rest}/>
                        : <Redirect to='/login' />
                }}/>
            </React.Fragment>
        )}
    </Context.Consumer>
);