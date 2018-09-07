import React from 'react';
import Select from 'react-select';


import EffectSelector from './EffectSelector';
import Script from './Script';

export default ({onChange, location, message, effect, isVisible}) => {
    return isVisible ? (

        <div className='settings'>
            
            <LocationSelector
                value={location}
                onChange={(newLocation) => onChange('location', newLocation)}
            />

            <EffectSelector
                value={effect}
                onChange={(newEffect) => onChange('effect', newEffect)}
            />

            <Message
                onChange={(newMessage) => onChange('message', newMessage)}
                value={message}
            />

            <Script />
        </div>

    ) : null;
}


const options = [
    {value:0,label:"Top Left"},
    {value:1,label:"Top Right"},
    {value:2,label:"Bottom Left"},
    {value:3,label:"Bottom Right"}
];

const LocationSelector = ({value, onChange}) => 
    <label htmlFor='location'>Placement<br/>
        <Select
            onChange={(e) => onChange(e.value)}
            value={options.find(o => o.value === value)}
            options={options}
        />
    </label>;


const Message = ({onChange, value}) =>
    <label htmlFor='message' >Message<br/> 
        <input
            id='message'
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)} 
        />
    </label>;