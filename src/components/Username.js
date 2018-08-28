import React from 'react';

import Context from './Context';

const Username = ({value}) => value === null ?
    <React.Fragment/>:
    <p>{value}</p>;

export default Username;




