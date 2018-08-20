import React from 'react';

import Context from './Context';

const Message = props =>
    <Context.Consumer>
        {(c) => (
            c.state.message ?
                <p className='message'>{c.state.message}</p>
                :
                <p className='hidden'></p>
        )}
    </Context.Consumer>;

export default Message;