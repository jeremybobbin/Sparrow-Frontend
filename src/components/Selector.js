import React from 'react';

const Selector = props =>
    <select onChange={(e) => props.onChange(e.target.value)}>
        {
            props.options.map((opt, i) => <option key={i} value={i}>{opt}</option>)
        }
    </select>;


export default Selector;