import React from 'react';
import Axios from 'axios';
import Layout from '../Layout';

import Form from '../components/Form';
import Input from '../components/Input';

const Login = props =>
    <Layout>
        <Form
            buttonText='Log In'
            func='logIn'
            inputs={[
                {
                    label: 'Email: ',
                    id: 'email'
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