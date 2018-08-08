import Axios from 'axios';
import React from 'react';

import Context from './Context';

export default class Provider extends React.Component {
    
    state = {
        loggedIn: false,
        message: null,
        first: null,
        last: null,
        email: null,
        id: null
    };
    
    set(callback) {
        return new Promise(resolve => this.setState(callback(this.state), resolve))
            .then(this.handleChange)
            .then(() => this.state);
    }
    
    logIn(email, password) {
        return Axios.post('http://localhost:3001/login', {email, password})
            .then(r => {
                if(r.error) {
                    this.set(s => {
                        s.message = r.data.message;
                        return s;
                    });
                } else {
                    this.set(s => {
                        for(let k in r.data) {
                            s[k] = r.data[k];
                        }
                        return s;
                    });
                }
            })
            .catch(() => this.set(s => {
                s.message = 'Cannot connect to server. Please try again later.';
                return s;
            }))
    }

    register(email, password, first, last) {
        Axios.post('http://localhost:3001/register', { first, last, email, password })
            .then(r => {
                if(r.data.error) {
                    this.set(s => {
                        s.message = r.data.message;
                        return s;
                    });
                } else {
                    this.set(s => {
                        s.first = first;
                        s.last = last;
                        s.email = email;
                        s.loggedIn = true;
                        s.message = r.data.message;
                        return s;
                    })
                }
            });
    }


    logOut() {
        this.set(s => {
            for(let k in s) {
                s[k] = null;
            }
            s.loggedIn = false;
            return s;
        });
    }
    
    handleChange(state) {
        console.log('State has changed.');
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,
                logIn: (e, p) => this.logIn(e, p),
                logOut: () => this.logOut(),
                register: (e, p, f, l) => this.register(e,p,f,l),
                set: (callback) => this.set(callback),
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
