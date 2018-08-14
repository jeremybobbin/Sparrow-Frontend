import Axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';

import Context from './Context';

const cookies = new Cookies();

function getSession() {
    return cookies.get('session');
}

function clearCookies() {
    console.log('CLEARING COOKIES');
    cookies.remove('session');
    cookies.remove('token');
}

function setSession(session) {
    console.log('SETTING SESSION: ' + session);
    if(session === undefined || session === null) throw 'This shit\'s broke.';
    cookies.set('session', session);
}

function sessionIsSet() {
    return (() => getSession() ? true : false);
}

function setToken(token) {
    console.log('SETTING TOKEN: ' + token);
    cookies.set('token', token);
}

function getToken() {
    let value = cookies.get('token');
    console.log('TOKEN: ' + value);
    return value;
}

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
        if(sessionIsSet()) {
            let token = getToken();
            let session = getSession();
            console.log('TOKEN: ' + token);
            console.log('SESSION: ' + session);
            Axios.post('http://localhost:3001/userinfo', {session, token})
                .then(r => {
                    console.log(r);
                    let {username, email} = r.data;
                    this.set(s => {
                        s.username = username;
                        s.email = email;
                        s.loggedIn = true;
                        return s;
                    });
                })
                .catch(r => clearCookies());
        }
    }
    
    logIn(username, password) {
        return Axios.post('http://localhost:3001/login', {username, password})
            .then(r => {
                let { session, email, message, token } = r.data;
                if(r.data.message) {
                    this.set(s => {
                        s.message = typeof message === 'string' ? message : 'An unknown error has occured.';
                        if(message.endsWith('or is blocked.')) s.message = 'You need to activate your account.';
                        return s;
                    });
                } else {
                    setSession(session);
                    setToken(token);
                    
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
                console.log(r);
                s.message = 'Cannot connect to server. Please try again later.';
                return s;
            }))
    }

    register(username, email, password) {
        Axios.post('http://localhost:3001/register', { username, email, password })
            .then(r => {
                console.log(r);
                let { session, message } = r.data;
                if(message) {
                    this.set(s => {
                        s.message = message;
                        return s;
                    });
                } else {
                    setSession(session);
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
        clearCookies();
        this.set(s => {
            for(let k in s) {
                s[k] = null;
            }
            s.loggedIn = false;
            s.message = 'You have been successfully logged out.';
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
