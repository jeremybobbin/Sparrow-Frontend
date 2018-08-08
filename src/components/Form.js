import React from 'react';

import Consumer from './Consumer';
import Input from './Input';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.values = {};
        props.inputs.forEach(input => {
            this.values[input.id] = '';
        });
        this.state = this.values;


        this.inputs = props.inputs.map((obj, i) => {
            this.values[obj.id] = '';
            return (
                <Input
                    key={i}
                    label={obj.label}
                    name={obj.id}
                    type={obj.type || null}
                    value={this.state[obj.id]}
                    onChange={(e) => this.update(e) }
                />
            );
        });
        this.props = props;
        console.log(this.state);
    }

    set(callback) {
        return new Promise(resolve => {
            let res = callback(this.state);
            console.log('Result from callback: ');
            console.log(res);
            this.setState(res);
        });
    }

    
    update(e) {
        console.log('Name: ' + e.target.name);
        console.log('Value: ' + e.target.value);
        this.set(s => {
            s[e.target.name] = e.target.value;
            return s;
        });
    }

    render() {
        return (
            <Consumer>
                {context => (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        context[this.props.func](...this.props.args);
                    }}>
                        {this.inputs}
                        <button type='submit'>{this.props.buttonText}</button>
                    </form>
                )}
            </Consumer>
        );
    }
}