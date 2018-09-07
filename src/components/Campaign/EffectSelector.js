import React from 'react';

import Select from 'react-select';

const options = [{"label":"Attention Seekers","options":[{"label":"Bounce","value":"bounce"},{"label":"Flash","value":"flash"},{"label":"Pulse","value":"pulse"},{"label":"Rubber Band","value":"rubberBand"},{"label":"Shake","value":"shake"},{"label":"Tada","value":"tada"},{"label":"Wobble","value":"wobble"},{"label":"Jello","value":"jello"}]},{"label":"Bouncing Effects","options":[{"label":"Bounce","value":"bounceIn"},{"label":"Bounce Down","value":"bounceInDown"},{"label":"Bounce Left","value":"bounceInLeft"},{"label":"Bounce Right","value":"bounceInRight"},{"label":"Bounce Up","value":"bounceInUp"}]},{"label":"Fading Effects","options":[{"label":"Fade In","value":"fadeIn"},{"label":"Fade Down","value":"fadeInDown"},{"label":"Fade Left","value":"fadeInLeft"},{"label":"Fade Right","value":"fadeInRight"},{"label":"Fade Up","value":"fadeInUp"}]},{"label":"Flippers","options":[{"label":"Flip","value":"flip"},{"label":"Flip X","value":"flipInX"},{"label":"Flip Y","value":"flipInY"}]},{"label":"Rotating Effects","options":[{"label":"Rotate","value":"rotateIn"},{"label":"Rotate Down Left","value":"rotateInDownLeft"},{"label":"Rotate Down Right","value":"rotateInDownRight"},{"label":"Rotate Up Left","value":"rotateInUpLeft"},{"label":"Rotate Up Right","value":"rotateInUpRight"}]},{"label":"Sliding Effects","options":[{"label":"Slide Up","value":"slideInUp"},{"label":"Slide Down","value":"slideInDown"},{"label":"Slide Left","value":"slideInLeft"},{"label":"Slide Right","value":"slideInRight"}]},{"label":"Zoom Effects","options":[{"label":"Zoom","value":"zoomIn"},{"label":"Zoom Down","value":"zoomInDown"},{"label":"Zoom Left","value":"zoomInLeft"},{"label":"Zoom Right","value":"zoomInRight"},{"label":"Zoom Up","value":"zoomInUp"}]},{"label":"Specials","options":[{"label":"Hinge","value":"hinge"},{"label":"Roll In","value":"rollIn"}]}]

export default ({value, onChange}) =>
    <label htmlFor='effect'>Animation<br/>
        <Select
            value={{
                value,
                label: value
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, char => char.toUpperCase())
            }}
            onChange={(e) => onChange(e.value)}
            options={options}
        />
    </label>;