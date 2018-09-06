import React from 'react';

export default ({update, name, url, isOpen}) => 
    <div className='head'>
        <DynamicInput
            className={'name'}
            value={name}
            isInput={isOpen}
            onChange={(newName) => update('name', newName)}
            name='Campaign Name'
        />
        <DynamicInput
            className={'url'}
            value={url}
            isInput={isOpen}
            onChange={(newUrl) => update('url', newUrl)}
            name='Campaign URL'
        />
    </div>;

const DynamicInput = ({onChange, isInput, value, className, name}) => isInput ?
    (<input
        value={value}
        onChange={e => onChange(e.target.value)}
        type='text'
        placeholder={name}/>)
    :
    <p className={className}>{value}</p>;



