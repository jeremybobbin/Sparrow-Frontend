const router = require('express').Router();
const Users = require('../models/Users');
const { UserRoute } = require('../JerWear');

router.post('/login', (req, res) => { 
    const {username, password} = req.body;

    Users.logIn(username, password)
        .then(r => res.json(r))
        .catch((err) => res.status(401).json({ err }));
});

router.post('/info', UserRoute, (req, res) => { 
    const { session, username, email } = req.userInfo;
    const { roles } = req;

    if(session && username && email)
        res.json({ session, username, email, roles });
    else
        res.status(401).json({ error: "/user/info" });
});

router.post('/logout', (req, res) => {

    const session = req.get('Session');
    const token = req.get('X-CSRF-Token');

    Users.logOut(session, token)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
});

router.post('/register', (req, res) => {

    const {username, email, password} = req.body;

    drup.register(username, email, password)
        .then(sessionInfo => res.json(sessionInfo))
        .catch(err => res.status(500).send(err.response.statusText));
});

router.get('/account', UserRoute, (req, res) => {
    
    const { userId, roles } = req;

    Users.billingInfo(userId)
        .then(billingInfo => {
            res.json({ billingInfo, roles });
        })
        .catch(error => {
            console.log('Error on /account:', err);
            res.status(500).json({ error });
        });
});


module.exports = router;
