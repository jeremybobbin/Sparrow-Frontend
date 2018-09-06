import React from 'react';
import Select from 'react-select';


import EffectSelector from './EffectSelector';
import Script from './Script';

export default ({onChange, location, message, effect, isVisible}) => {
    console.log('Location:   ' + location);
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
    {label:'Top Left', value:'one'},
    {label:'Top Right', value:'two'},
    {label:'Bottom Left', value:'three'},
    {label:'Bottom Right', value:'four'}
];

const LocationSelector = ({value, onChange}) =>
    <label htmlFor='location'>Placement<br/>
        <Select
            onChange={(e) => onChange(e.value)}
            value={value}
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