import React from 'react';
import './styles.css';


export default ({remove, toLeads, toggleSettings, toggleSwitch, isOn}) => 
    <div className='sidebar' >
        <Switch
            value={isOn}
            onChange={toggleSwitch}
        />

        <Person 
            onClick={toLeads}
        />
        <Cog 
            onClick={toggleSettings}
        />
        <Trash
            onClick={remove}
        />
    </div>;



const Trash = ({onClick}) => 
    <input type='image'
        className={`icon trash`}
        src={'https://image.flaticon.com/icons/svg/126/126468.svg'}
        onClick={(e) => onClick(e)}
    />;

const Person = ({onClick}) =>
    <input type='image'
        className={`icon person`}
        src={'https://image.flaticon.com/icons/svg/126/126486.svg'}
        onClick={(e) => onClick(e)}
    />;

const Cog = ({onClick}) => 
    <input type='image'
        className={`icon cog`}
        src={'https://image.flaticon.com/icons/svg/1/1850.svg'}
        onClick={(e) => onClick(e)}
    />;

const Switch = ({onChange, value}) => 
    <label className={`switch`}>
        <input onChange={(e) => onChange(e)} checked={value} type="checkbox" />
        <span className="slider round"></span>
    </label>;