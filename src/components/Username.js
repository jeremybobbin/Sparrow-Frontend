import React from 'react';

import Context from './Context';

const Username = props =>
    <Context.Consumer>
        {(c) => (
            c.state.username ?
                <p>{c.state.username}</p>
                :
                <p className='hidden'></p>
        )}
    </Context.Consumer>;

export default Username;




