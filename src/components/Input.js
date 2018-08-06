import React from 'react';


const Input = props => 
    props.label ?
    <label htmlFor={props.id || props.name}>{props.label}
        <input name={props.name} value={props.value} onChange={(e) => props.onChange(e)} type={props.type || 'text'} className={props.className || ''} id={props.id || props.name} placeholder={props.placeholder} />
    </label>
    :
    <input value={props.value} onChange={(e) => props.onChange(e)} type={props.type} className={props.className} id={props.id} placeholder={props.placeholder} />;

export default Input;