import React from 'react';
import '../css/components/icon.css';

const Icon = props => 
    <input type='image'
        className={`icon ${props.className || ''}`}
        src={props.src}
        onClick={(e) => props.onClick(e)}
    />;

export default Icon;