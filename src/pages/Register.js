import React from 'react';
import Form from '../components/Form';





export default (props) =>
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
    />;