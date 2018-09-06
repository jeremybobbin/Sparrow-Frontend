import React from 'react';

import Select from 'react-select';


const groups = {
    "Attention Seekers": {
        bounce: 'Bounce',
        flash: 'Flash',
        pulse: 'Pulse',
        rubberBand: 'Rubber Band',
        shake: 'Shake',
        tada: 'Tada',
        wobble: 'Wobble',
        jello: 'Jello',
    },
    "Bouncing Effects": {
        bounceIn: "Bounce",
        bounceInDown: "Bounce Down",
        bounceInLeft: "Bounce Left",
        bounceInRight: "Bounce Right",
        bounceInUp: "Bounce Up",
    },
    "Fading Effects": {
        fadeIn: "Fade In",
        fadeInDown: "Fade Down",
        fadeInLeft: "Fade Left",
        fadeInRight: "Fade Right",
        fadeInUp: "Fade Up",
    },
    "Flippers": {
        flip: "Flip",
        flipInX: "Flip X",
        flipInY: "Flip Y",
    },
    "Rotating Effects": {
        rotateIn: "Rotate",
        rotateInDownLeft: "Rotate Down Left",
        rotateInDownRight: "Rotate Down Right",
        rotateInUpLeft: "Rotate Up Left",
        rotateInUpRight: "Rotate Up Right",
    },
    "Sliding Effects": {
        slideInUp: "Slide Up",
        slideInDown: "Slide Down",
        slideInLeft: "Slide Left",
        slideInRight: "Slide Right",
    },
    "Zoom Effects": {
        zoomIn: "Zoom",
        zoomInDown: "Zoom Down",
        zoomInLeft: "Zoom Left",
        zoomInRight: "Zoom Right",
        zoomInUp: "Zoom Up",
    },
    "Specials": {
        hinge: "Hinge",
        rollIn: "Roll In",
    }
};

const options = [];

for(let groupLabel in groups) {
    const optionsObj = groups[groupLabel];
    const tempObj = {
        label: groupLabel,
        options: []
    };
    for(let value in optionsObj) {
        const label = optionsObj[value];
        tempObj.options.push({label, value});
    }
    options.push(tempObj);
}

export default ({effect, onChange}) => 
    <label htmlFor='effect'>Animation<br/>
        <Select
            value={effect}
            onChange={(e) => onChange(e.value)}
            options={options}
        />
    </label>;






        //         <option value="none">No animation</option>
        //     <optgroup label="Attention Seekers">
        //         <option value="bounce">Bounce</option>
        //         <option value="flash">Flash</option>
        //         <option value="pulse">Pulse</option>
        //         <option value="rubberBand">Rubber Band</option>
        //         <option value="shake">Shake</option>
        //         <option value="swing">Swing</option>
        //         <option value="tada">Tada</option>
        //         <option value="wobble">Wobble</option>
        //         <option value="jello">Jello</option>
        //     </optgroup>
        //     <optgroup label="Bouncing Effects">
        //         <option value="bounceIn">Bounce</option>
        //         <option value="bounceInDown">Bounce Down</option>
        //         <option value="bounceInLeft">Bounce Left</option>
        //         <option value="bounceInRight">Bounce Right</option>
        //         <option value="bounceInUp">Bounce Up</option>
        //     </optgroup>
        //     <optgroup label="Fading Effects">
        //         <option value="fadeIn" selected="selected">Fade In</option>
        //         <option value="fadeInDown">Fade Down</option>
        //         <option value="fadeInLeft">Fade Left</option>
        //         <option value="fadeInRight">Fade Right</option>
        //         <option value="fadeInUp">Fade Up</option>
        //     </optgroup>
        //     <optgroup label="Flippers">
        //         <option value="flip">Flip</option>
        //         <option value="flipInX">Flip X</option>
        //         <option value="flipInY">Flip Y</option>
        //     </optgroup>
        //     <optgroup label="Rotating Effects">
        //         <option value="rotateIn">Rotate</option>
        //         <option value="rotateInDownLeft">Rotate Down Left</option>
        //         <option value="rotateInDownRight">Rotate Down Right</option>
        //         <option value="rotateInUpLeft">Rotate Up Left</option>
        //         <option value="rotateInUpRight">Rotate Up Right</option>
        //     </optgroup>
        //     <optgroup label="Sliding Effects">
        //         <option value="slideInUp">Slide Up</option>
        //         <option value="slideInDown">Slide Down</option>
        //         <option value="slideInLeft">Slide Left</option>
        //         <option value="slideInRight">Slide Right</option>
        //     </optgroup>
        //     <optgroup label="Zoom Effects">
        //         <option value="zoomIn">Zoom</option>
        //         <option value="zoomInDown">Zoom Down</option>
        //         <option value="zoomInLeft">Zoom Left</option>
        //         <option value="zoomInRight">Zoom Right</option>
        //         <option value="zoomInUp">Zoom Up</option>
        //     </optgroup>
        //     <optgroup label="Specials">
        //         <option value="hinge">Hinge</option>
        //         <option value="rollIn">Roll In</option>
        //     </optgroup>
        // </select>