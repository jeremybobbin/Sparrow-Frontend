import React from 'react';
import Axios from 'axios';
import Layout from '../Layout';

import Input from '../components/Input';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
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
        console.log(k);
        console.log(v);
        this.set(s => {
            s[k] = v;
            return s;
        });
    }

    submit() {
        if(this.call()) {

        } else {
            this.set(s => {
                s.message = 'Email/Password is incorrect.';
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
                <Input
                    label='Email: '
                    id='email'
                    name='email'
                    value={this.state.email}
                    onChange={(e) => this.update(e) }
                />
                <Input
                    label='Password: '
                    id='password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={(e) => this.update(e) }
                />
                <button onClick={() => this.submit()}>Submit</button>
            </Layout>
        ); 
    }
}