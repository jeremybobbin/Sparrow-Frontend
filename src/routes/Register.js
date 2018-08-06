import React from 'react';
import Axios from 'axios';
import Layout from '../Layout';

import Input from '../components/Input';

let inputsArr = [
    {
        label: 'First Name: ',
        id: 'first'
    },
    {
        label: 'Last Name: ',
        id: 'last'
    },
    {
        label: 'Email: ',
        id: 'email',
        type: 'email'
    },
    {
        label: 'Password: ',
        id: 'password',
        type: 'password',
    },
];

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            first: '',
            last: '',
            email: '',
            password: '',
        };
    }

    set(callback) {
        return new Promise(resolve => this.setState(callback(this.state), resolve()));
    }

    update(e) {
        let k = e.target.name,
            v = e.target.value;
        this.set(s => {
            s[k] = v;
            return s;
        });
    }

    submit() {
        if(this.call()) {

        } else {
            this.set(s => {
                s.message = 'Username/Password is incorrect.';
                return s;
            });
        }
    }

    call() {
        return false;
    }



    render() {
        return (
            <Layout>
                <p className={this.state.message ? '' : 'hidden' }>{this.state.message}</p>
                {
                    inputsArr.map((obj, i) => {
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
                    })
                }
                <button onClick={() => this.submit()}>Register</button>
            </Layout>
        ); 
    }
}