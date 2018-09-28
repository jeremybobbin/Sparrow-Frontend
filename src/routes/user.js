const router = require('express').Router();
const Users = require('../models/Users');

router.post('/login', (req, res) => { 
    const {username, password} = req.body;

    Users.logIn(username, password)
        .then(r => res.json(r))
        .catch((err) => res.sendStatus(401));
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


module.exports = router;
