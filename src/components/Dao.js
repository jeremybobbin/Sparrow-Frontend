import React, { Children } from 'react';

import Context from './Context';


const Dao = props =>
    <Context.Consumer>
        {(context) => (
            <React.Fragment>
                {
                    React.createElement(
                        props.tag || 'p',
                        {
                            ...props,
                            context,
                            onClick: (e) => props.onClick(context, e)
                        },
                        props.children
                    )
                }
            </React.Fragment>
        )}
    </Context.Consumer>;

export default Dao;