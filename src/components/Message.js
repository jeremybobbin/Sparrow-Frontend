import React from 'react';


const Message = ({message}) => message === null ?
    <React.Fragment/>:
    <p>{message}</p>;

export default Message;