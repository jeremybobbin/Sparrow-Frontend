import React from 'react';

export default ({leads}) =>
    <ul>
        {
            leads ? leads.map((lead, i) => <Lead key={i} {...lead}/>) : null
        }
    </ul>

const Lead = ({first, last, ip, email, city, region, country, time}) =>
    <li>
        <p>{first + ' ' + last}</p>
        <p>{email}</p>
        <p>{ip}</p>
        <p>{city}</p>
    </li>