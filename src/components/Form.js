import React from 'react';

import Consumer from './Consumer';
import Input from './Input';
import { timingSafeEqual } from 'crypto';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        const values = {};
        console.log(props.inputs);
        props.inputs.forEach(input => {
            values[input.id] = '';
        });
        this.state = values;

        this.inputs = props.inputs.map((obj, i) => {
            return (
                <Input
                    key={i}
                    label={obj.label}
                    name={obj.id}
                    type={obj.type || null}
                    value={this.state[(() => obj.id)]}
                    onChange={(e) => this.update(e) }
                />
            );
        });
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
        let args = [];
        for(let prop in this.state) {
            args.push(this.state[prop]);
        }
        console.log(args);
        ((a, b) => console.log(a + ' | ' + b))(...args);
        c[this.props.func](...args);
    }

    render() {
        return (
            <Consumer>
                {c => (
                    <form onSubmit={(e) => this.handle(e, c)}>
                        {this.inputs}
                        <button type='submit'>{this.props.buttonText}</button>
                    </form>
                )}
            </Consumer>
        );
    }
}