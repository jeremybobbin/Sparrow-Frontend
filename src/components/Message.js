import React from 'react';

import {Consumer} from './Context';

const Message = ({message}) => message === null ?
    <React.Fragment/>:
    <p>{message}</p>;

export default Message;