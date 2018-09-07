import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const dev = process.env.NODE_ENV === 'development';

export default ({component: Component, ...rest}) => (
        <React.Fragment>
            <Route {...rest}
                render={(props) => {
                    return true === true 
                    ? <Component {...props} {...rest}/>
                    : <Redirect to='/login' />
            }}/>
        </React.Fragment>
);