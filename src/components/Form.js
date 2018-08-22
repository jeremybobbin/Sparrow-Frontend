import React from 'react';

import {Consumer} from './Context';
// import Input from './Input';
import { timingSafeEqual } from 'crypto';

import '../css/components/form.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        const values = {};
        props.inputs.forEach(input => values[input.id] = '');
        this.state = values;
        this.inputs = props.inputs;
    }

    set = callback => new Promise(
        resolve => this.setState(callback(this.state), (s) => resolve)
    );
    
    update(e) {
        const {name, value} = e.target;
        this.set(s => {
            s[name] = value;
            return s;
        }).then(res => console.log(res))
    }

    handle(e, c) {
        e.preventDefault();
        const args = Object.keys(this.state).map(k => this.state[k]);
        c[this.props.func](...args);
    }

    render() {
        const inputs = this.inputs.map((obj, i) => <Input
            key={i}
            label={obj.label}
            name={obj.id}
            type={obj.type || null}
            value={this.state[(() => obj.id)]}
            onChange={(e) => this.update(e) }
        />);

        return (
            <Consumer>
                {c => (
                    <form className='form' onSubmit={(e) => this.handle(e, c)}>
                        {inputs}
                        <button type='submit'>{this.props.buttonText}</button>
                    </form>
                )}
            </Consumer>
        );
    }
}




const Input = props => 
    props.label ?
    <label htmlFor={props.id || props.name}>{props.label}
        <input name={props.name} value={props.value} onChange={(e) => props.onChange(e)} type={props.type || 'text'} className={props.className || ''} id={props.id || props.name} placeholder={props.placeholder} />
    </label>
    :
    <input value={props.value} onChange={(e) => props.onChange(e)} type={props.type} className={props.className} id={props.id} placeholder={props.placeholder} />;
