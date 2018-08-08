import React from 'react';
import Context from './Context';

const Consumer = props => 
    <Context.Consumer>
        {props.children}
    </Context.Consumer>


export default Consumer;