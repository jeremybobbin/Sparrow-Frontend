import Axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';

import Context from './Context';
import dao from '../models/Dao';

export default class Provider extends React.Component {
    
    state = {
        loggedIn: false,
        message: null,
        username: null,
        email: null
    };
    
    set(callback) {
        return new Promise(resolve => this.setState(callback(this.state), resolve))
            .then(this.handleChange)
            .then(() => this.state);
    }

    componentWillMount() {
        if(dao.cookiesAreSet()) {
            dao.getUserInfo()
                .then(r => {
                    let {username, email} = r.data;
                    this.set(s => {
                        s.username = username;
                        s.email = email;
                        s.loggedIn = true;
                        return s;
                    });
                })
                .catch(r => dao.clearCookies());
        }
    }
    
    logIn(username, password) {
        return dao.logIn(username, password)
            .then(r => {
                let { session, email, message, token } = r.data;
                if(r.data.message) {
                    this.set(s => {
                        s.message = typeof message === 'string' ? message : 'An unknown error has occured.';
                        if(message.endsWith('or is blocked.')) s.message = 'You need to activate your account.';
                        return s;
                    });
                } else {
                    dao.setCookies(session, token);
                    
                    this.set(s => {
                        s.loggedIn = true;
                        s.email = email;
                        s.username = username;
                        s.message = 'You have been logged in successfully.';
                        return s;
                    });
                }
            })
            .catch(r => this.set(s => {
                s.message = 'Cannot connect to server. Please try again later.';
                return s;
            }))
    }

    register(username, email, password) {
        return dao.register(username, email, password)
            .then(r => {
                let { session, message } = r.data;
                if(message) {
                    this.set(s => {
                        s.message = message;
                        return s;
                    });
                } else {
                    dao.setSession(session);
                    this.set(s => {
                        s.email = email;
                        s.username = username;
                        s.loggedIn = true;
                        s.message = 'You have registered successfully.';
                        return s;
                    })
                }
            });
    }


    logOut() {
        return dao.logOut()
            .then(r => {
                this.set(s => {
                    for(let k in s) {
                        s[k] = null;
                    }
                    s.loggedIn = false;
                    s.message = 'You have been successfully logged out.';
                    return s;
                });
                dao.clearCookies();
            });
    }
    
    handleChange(state) {
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,
                verify: () => this.verify(),
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
