import React from 'react';

import '../css/components/footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className='footer' >
                <p className='footer-text'>&copy;2018 Sparrow CRM</p>
            </footer>
        );
    }
}