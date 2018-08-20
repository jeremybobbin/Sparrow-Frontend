import React from 'react';
import Axios from 'axios';
import Layout from '../Layout';

import Form from '../components/Form';
import Input from '../components/Input';

import '../css/routes/login.css';

const Login = props =>
    <Layout className='login-page'>
        <Form
            buttonText='Log In'
            func='logIn'
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
        >
        </Form>
    </Layout>;
    
export default Login;