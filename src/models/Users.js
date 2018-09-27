const drup = require('./DrupalServer');


module.exports = class Users {
    
    
    static register(name, email, pass) {
        return drup.getNewUserId(name, email, pass)
            .then(({body}) => body)
    }

    static logIn(name, pass) {
        return drup.getTokensByUserLogin(name, pass)
            .then(Users.handleInfo);
    }

    static authenticateTokens(session, token) {
        return drup.getUserInfoByTokens(session, token)
            .then(({body}) => Users.handleInfo(body));
    }

    static handleInfo(body) {
        console.log('Handling...');
        console.log(body);


        const { sessid, session_name, token, user } = body;

        if(!(sessid && session_name && user))
            throw 'Authentication server did not return tokens.';
        
        const { uid, name, mail, roles } = user;

        if(!(uid && name && mail && roles))
            throw 'Authentication server did not return tokens.';
        

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