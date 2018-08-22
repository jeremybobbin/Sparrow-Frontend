import React from 'react';
import Axios from 'axios';
import Layout from '../components/Layout';

import RegisterButton from '../components/RegisterButton';
import Input from '../components/Input';
import Form from '../components/Form';





export default (props) =>
    <Layout>
        <Form
            func='register'
            buttonText='Register'
            inputs={[
                {
                    label: 'Username: ',
                    id: 'username'
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
            ]}
        >
        </Form>
    </Layout>;