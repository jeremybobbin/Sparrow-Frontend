import React from 'react';
import '../css/components/switch.css';


const Switch = props => 
    <label className={`switch ${props.className || ''}`}>
        <input onChange={(e) => props.onChange(e)} checked={props.value} type="checkbox" />
        <span className="slider round"></span>
    </label>;

export default Switch;