import React from 'react';

const FluidText = props => {
    return props.isInput ?
        (<input value={props.value} onChange={e => props.onChange(e.target.value)} />)
        :
        React.createElement(props.tag || 'p', {className: props.className}, props.value);
}



export default FluidText;