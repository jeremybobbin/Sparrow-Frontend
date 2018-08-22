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

const Icons = props => icons.map((icon, index) => <Icon
    key={index}
    src={icon.src}
    className={icon.name}
    onClick={(e) => props[icon.func](e)}
/>);

const Campaign = ({name, url, isOpen, enabled, leads, update, message, placement}) =>
    <div className="campaign card">
        <FluidText
            className='name'
            tag='h5'
            value={name}
            isInput={isOpen}
            onChange={(v) => update('name', v)}
        />
        <FluidText
            className='url'
            tag='h6'
            value={url}
            isInput={isOpen}
            onChange={(v) => update('url', v)}
        />

        <p className='lead-count'>Lead Count: {leads}</p>
        <Switch
            className='switch'
            onChange={(e) => update('enabled', e.target.checked)}
            value={enabled}    
        />
        <Icons />
        <div className='placeholder'></div>
        <div className={`settings ${isOpen ? 'open' : 'closed'}`}>
            <label htmlFor='selector' > Position: 
                <Selector id='selector' onChange={(v) => update('position', v)} options={['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right']}/>
            </label>
            <label htmlFor='message' > Message: 
                <input id='message' type='text' onChange={(e) => update('message', e.target.value)} value={message} />
            </label>
            {
                enabled ?
                <Code
                    url={url}
                    placement={placement}
                    message={message}
                /> : null
            }
        </div>
    </div>;

export default Campaign;