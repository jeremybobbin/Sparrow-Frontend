import React from 'react';
import Switch from './Switch';
import Icon from './Icon';
import FluidText from './FluidText';
import Selector from './Selector';
import Code from './Code';

import '../css/components/campaign.css';


const icons = [
    {
        name: 'cog',
        src: 'https://image.flaticon.com/icons/svg/70/70367.svg',
        func: 'toggleSettings',
    },
    {
        name: 'person',
        src: 'https://image.flaticon.com/icons/svg/74/74472.svg',
        func: 'toLeads',
    },
    {
        name: 'trash',
        src: 'https://image.flaticon.com/icons/svg/126/126468.svg',
        func: 'remove',
    },
];

const Campaign = props =>
    <div className="campaign card">
        <FluidText
            className='name'
            tag='h5'
            value={props.name}
            isInput={props.isOpen}
            onChange={(v) => props.update('name', v)}
        />
        <FluidText
            className='url'
            tag='h6'
            value={props.url}
            isInput={props.isOpen}
            onChange={(v) => props.update('url', v)}
        />

        <p className='lead-count'>Lead Count: {props.leads}</p>
        <Switch
            className='switch'
            onChange={(e) => props.update('enabled', e.target.checked)}
            value={props.enabled}    
        />
        {
            icons.map((icon, index) => <Icon
                key={index}
                src={icon.src}
                className={icon.name}
                onClick={(e) => props[icon.func](e)}
            />)
        }
        <div className='placeholder'></div>
        <div className={`settings ${props.isOpen ? 'open' : 'closed'}`}>
            <label htmlFor='selector' > Position: 
                <Selector id='selector' onChange={(v) => props.update('position', v)} options={['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right']}/>
            </label>
            <label htmlFor='message' > Message: 
                <input id='message' type='text' onChange={(e) => props.update('message', e.target.value)} value={props.message} />
            </label>
            {
                props.enabled ?
                <Code
                    url={props.url}
                    placement={props.placement}
                    message={props.message}
                /> : null
            }
        </div>
    </div>;

export default Campaign;