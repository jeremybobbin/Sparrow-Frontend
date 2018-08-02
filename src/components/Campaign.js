import React from 'react';

const Campaign = props =>
    <div className="campaign card">
        <h5 className="name">{props.name}</h5>
        <h6 className="url">{props.url}</h6>
        <p>{props.leads}</p>
        <input type='image' className="cog icon" src='https://image.flaticon.com/icons/svg/70/70367.svg'/>
        <input type='image' className="person icon" src='https://image.flaticon.com/icons/svg/74/74472.svg'/>
        <input type='image' className="trashcan icon" onClick={() => props.remove()} src='https://image.flaticon.com/icons/svg/126/126468.svg'/>
    </div>;

export default Campaign;