const router = require('express').Router();
const Users = require('../models/Users');
const { UserRoute } = require('../JerWear');

router.use('/campaigns', require('./campaigns'));
router.use('/leads', require('./leads'));
router.use('/user', require('./user'));


router.get('/billing', UserRoute, (req, res) => {
    const { userId } = req;

    Users.billingInfo(userId)
        .then(results => res.json(results))
        .catch(err => res.status(500).json({ err }));
});

module.exports = router;


