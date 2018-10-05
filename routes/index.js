const router = require('express').Router();
const Users = require('../models/Users');
const { UserRoute } = require('../JerWear');
const Querier = require('../models/Querier');
const Json2csvTransform = require('json2csv').Transform;
const JsonStreamStringify = require('../JsonStreamStringify');

const { Buffer } = require('buffer');

router.use('/campaigns', require('./campaigns'));
router.use('/leads', require('./leads'));
router.use('/user', require('./user'));


router.get('/billing', UserRoute, (req, res) => {
    const { userId } = req;

    Users.billingInfo(userId)
        .then(results => res.json(results))
        .catch(err => res.status(500).json({ err }));
});

router.post('/log', UserRoute, (req, res) => {
    const { message } = req.body;
    const { ip } = req;
    
    Querier.log(ip, message)
    res.status(200).send("OK");
});

router.get('/log', UserRoute, (req, res) => {
    
    Querier.getLogs()
        .then(results => res.json(results))
        .catch(err => res.status(500).json({ err }));
});


// Requires UserRoute
router.get('/download/:campaignId', (req, res) => {
    console.log('HIT')
    const { campaignId } = req.params;

    Querier.streamLeadsByCampaign(campaignId)
        .then(sqlStream => {

            res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
            res.writeHead(200, {
                'Content-Type': 'text/csv'
            });

            const json = new JsonStreamStringify(sqlStream);

            const csv = new Json2csvTransform();


            json.pipe(csv).pipe(res);

        }).catch(err => {
            console.log('Error',err)
            res.status(500).send(err.message);
        });

    
});



module.exports = router;


