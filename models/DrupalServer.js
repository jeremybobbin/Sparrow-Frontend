const { apiUrl } = require('../config');
const fetch = require('node-fetch');

let csrfToken;

class API {

    // Takes (path, body) || (path, session, token) Returns a promise
    static request(path = '', bodyOrSession = {}, token) {
        let body;
        let session;

        const method = 'POST';
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };

        if(typeof bodyOrSession === 'string')
            session = bodyOrSession;

        if(typeof bodyOrSession === 'object')
            body = JSON.stringify(bodyOrSession);

        if(session) {
            headers["Cookie"] = session;
        }

        if(!token) 
            token =  csrfToken;
        
        headers["X-CSRF-Token"] = token;
        
        return fetch(apiUrl + path, { method, headers, body })
            .catch(err => {
                // This is a serverside problem.
                console.log('SERVER SIDE ERROR IN DrupalServer.js');
                console.log('\n\nError Message: ');
                console.log(err);
                console.log('\n\n\n');
            }) 
            .then(response => Promise.all([
                response.headers, response.json()
            ]))
            .then(([headers, body]) => ({headers, body}));
    }



    static getToken() {
        if(csrfToken) return csrfToken;
        
        return API.request('/user/token')
            .then(({token}) => csrfToken = token);
    
    }
    

    // Verifies session, returns a session and some user information
    static getUserInfoByTokens(session, token) {
        return API.request('/system/connect', session, token);
    }

    // LogOut - returns HTTP 200
    static destroySession(session, token) {
        return API.request('/user/logout', session, token);
    }

    // LogIn mostly except returns session, a CSRF-token and some user information    
    static getTokensByUserLogin(username, password) {
        return API.request('/user/login', {username, password});
    }

    // Returns { uid: Int, uri: String}
    static getNewUserId(name, email, pass) {
        return API.request('/user/register', {name, email, pass});
    }

    // Register



}

API.getToken().catch(err => console.log(err));

module.exports = API;





const axios = require('axios');
class OldDrupalServer {
    
    constructor(url) {
        this.url = url;
        this.csrf;
    }

    init(callback) {
        return new Promise((resolve, reject) => {
            this.genCsrf()
                .then(() => resolve(this))
                .catch(() => reject(this));
        });
    }

    // headers object -> headers object with CSRF token
    getHeaders(header) {
        const headers = { 'Content-Type': 'application/json' };
        if(this.csrf) headers["X-CSRF-Token"] = this.csrf;
        for(let prop in header) {
            headers[prop] = header[prop];
        }
        return headers;
    }

    // Makes POST request but appends CSRF token to 
    request(path, data, header = null) {
        let headers = this.getHeaders(header);
        return axios({
            method: 'POST',
            url: this.getUrl(path),
            data,
            headers
        });
    }

    // Appends path to API URL
    getUrl(path = '') {
        return this.url + path;
    }

    // Promise that resolves a CSRF token
    getCsrf() {
        return new Promise(resolve => {
            if(this.csrf) resolve(this.csrf);
            else return this.genCsrf();
        });
    }

    // Gets CSRF token
    genCsrf() {
        return this.request('user/token')
            .then(r => {
                if(r.data && r.data.token) return this.csrf = r.data.token;
                else throw 'CSRF Token was not returned from: ' + this.getUrl();
            });
    }
 

    // If can register, returns sessionId, sessionName, uId ELSE returns Status Code
    register(name, mail, pass) {
        return this.request('user/register', {name, mail, pass})
            .then(res => {
                if(!res.headers) throw 'No headers from Drupal server';
                
                const cookieArray = res.headers['set-cookie'][0].split('; ');
                const session = cookieArray[0];
                
                return {
                    session,
                    username: name,
                    email: mail
		        };
            });
    }


    // If Password is correct, returns sessionId, sessionName, uId and token, ELSE returns Status Code
    logIn(username, password) {
        return this.request('user/login', {username, password})
            .then(({data}) => {
		        this.csrf = data.token;
                if(data && data.user) return {
                    token: data.token,
                    session: data.session_name + '=' + data.sessid,
                    email: data.user.mail,
                    username: data.user.name
                };
                else throw 'Could not find user ID.';
            });
    }


    logOut(session, token) {
        if(!session || !token) return Promise.reject();
        const headers = {"Cookie": session, "X-CSRF-Token": token};
        return this.request('user/logout', null, headers);
    }

    // If valid returns uId and SESSION ELSE FALSE
    getUserInfo(session, token) {
        const headers = {"Cookie": session, "X-CSRF-Token": token};
        return this.request('system/connect', null, headers)
            .then(r => {
                if(r.data && r.data.user) {
                    if(r.data.message) throw r.data.message;
                    if(r.data.user.uid === 0) throw 'Invalid Session.';
                    else return {
                        username: r.data.user.name,
                        email: r.data.user.mail,
                    };   
                }
            });
    }

    // Takes Session, if valid, returns uID ELSE FALSE.
    verify(session, token) {
        const headers = {"Cookie": session, "X-CSRF-Token": token};

        return this.request('system/connect', null, headers)
            .then(({data}) => {
                if(data.user && data.user.uid !== 0) return data.user.uid;   
                else throw 'Could not verify';
            
            });
    }

}
