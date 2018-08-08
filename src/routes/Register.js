import React from 'react';
import Axios from 'axios';
import Layout from '../Layout';

import RegisterButton from '../components/RegisterButton';
import Input from '../components/Input';
import Form from '../components/Form';

let inputs = [
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



    render() {
        return (
            <Layout>
                <Form
                    func='register'
                    args={[this.state.email, this.state.password, this.state.first, this.state.last]}
                    buttonText='Register'
                    inputs={inputs}
                >
                </Form>
            </Layout>
        ); 
    }
}