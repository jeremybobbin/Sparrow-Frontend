import React from 'react';

export default ({first, last, ip, email, city, region, country, time}) =>
    <li>
        <p>{first + ' ' + last}</p>
        <p>{email}</p>
        <p>{ip}</p>
        <p>{city}</p>
    </li>