import React from 'react';

const Username = ({value, redirect}) => value ?
    <p 
        onClick={() => redirect('/logout')}
        className='username'
    >{value}</p>:
    <React.Fragment/>;

export default Username;




