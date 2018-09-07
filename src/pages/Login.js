import React from 'react';

import {Inject} from '../components/Context';
import Form from '../components/Form';

import '../css/routes/login.css';

const Login = ({logIn}) =>
        <Form
            buttonText='Log In'
            submitHandler={(username, password) => logIn(username, password)}
            inputs={[
                {
                    label: 'Username: ',
                    id: 'username'
                },
                {
                    label: 'Password: ',
                    id: 'password',
                    type: 'password'
                }
            ]}
        />;
    
export default Inject(Login, 'logIn');