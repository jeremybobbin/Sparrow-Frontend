import React from 'react';
import Axios from 'axios';
import Layout from '../components/Layout';

import Form from '../components/Form';
import Input from '../components/Input';

import '../css/routes/login.css';

const Login = ({submitHandler}) =>
        <Form
            buttonText='Log In'
            submitHandler={submitHandler}
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
    
export default Login;