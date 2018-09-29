const drup = require('./DrupalServer');
const Utils = require('../Utils');
const Querier = require('./Querier');

module.exports = class Users {
    
    
    static register(name, email, pass) {
        return drup.getNewUserId(name, email, pass)
            .then(({body}) => {
                if(!body)
                    throw 'Authentication server did not return response body.';
                return body.uid;
            })
    }

    static logIn(name, pass) {
        return drup.getTokensByUserLogin(name, pass)
            .then(Users.handleInfo);
    }

    static logOut(session, token) {
        return drup.destroySession(session, token);
    }

    static authenticateTokens(session, token) {
        return drup.getUserInfoByTokens(session, token)
            .then(Users.handleInfo);
    }

    static billingInfo(userId) {
        if(!userId)
            return Promise.reject('Cannot get billing info without User ID.');
        
        return Querier.getBillingInfo(userId);
    }

    static handleInfo(response) {
        Utils.print({ response });
        const { body } = response;
        
        Utils.print({ body });

        if(!body)
            throw 'Authentication server did not return response body.';

        const { sessid, session_name, token, user } = body;

        if(!(sessid && session_name && user))
            throw 'Authentication server did not return tokens.';
        
        const { uid, name, mail, roles } = user;


        Utils.print({ uid, name, mail, roles });
        if(!(uid && name && mail && roles))
            throw 'Authentication server did user information.';
        

        console.log('UserID: ' + uid);
        return {
            token,
            session: session_name + '=' + sessid,
            userId: uid,
            username: name,
            email: mail,
            roles
        };
    }
}

// tatic getUserInfoByTokens(session, token) {
//         return API.request('/system/connect', session, token);
//     }

//     // LogOut - returns HTTP 200
//     static destroySession(session, token) {
//         return API.request('/user/logout', session, token);
//     }

//     // LogIn mostly except returns session, a CSRF-token and some user information    
//     static getTokensByUserLogin(username, password) {
//         return API.request('/user/login', {username, password});
//     }

//     // Returns { uid: Int, uri: String}
//     static getNewUserId(name, email, pass) {
//         return API.request('/user/register', {name, email, pass});
//     }