import React from 'react';
import {Inject} from './Context';

const Message = ({message}) => message === null ?
    <React.Fragment/>:
    <p>{message}</p>;

export default Inject(Message, 'message');