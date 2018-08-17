import React from 'react';

import Lead from './Lead';

export default ({leads}) =>
    <ul>
        {
            leads ? leads.map((lead, i) => <Lead key={i} {...lead}/>) : null
        }
    </ul>