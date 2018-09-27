const router = require('express').Router();

router.use('/campaigns', require('./campaigns'));
router.use('/leads', require('./leads'));
router.use('/user', require('./user'));

module.exports = router;


