import React from 'react';

import {Consumer} from './Context';

const Message = props =>
    <Consumer>
        {(c) => (
            c.state.message ?
                <p className='message'>{c.state.message}</p>
                :
                <p className='hidden'></p>
        )}
    </Consumer>;

export default Message;