import React from 'react';

import Context from './Context';

const Username = props =>
    <Context.Consumer>
        {(c) => (
            c.state.first ?
                <p>{c.state.first}</p>
                :
                <p className='hidden'></p>
        )}
    </Context.Consumer>;

export default Username;




