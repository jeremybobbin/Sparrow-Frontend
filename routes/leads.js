const router = require('express').Router();

const { UserRoute } = require('../JerWear');
const Leads = require('../models/Leads');
const Utils = require('../Utils');

// GET /leads
// GET /leads?id=120431 <-- that's a possible campaign ID.
router.get('/', UserRoute, (req, res) => {
    let { page, pageSize, orderParams, id } = req.query;
    
    if(typeof id === 'string') id = parseInt(id);

    [page, pageSize] = Utils.parseInt(page, pageSize);
    

    const { userId } = req;

    Leads.getPage(userId, pageSize, page, orderParams, id)
        .then(({pages, leads}) => res.json({ pages, leads }))
        .catch(err => res.status(500).json({ err }));
});

router.post('/', (req, res) => {
    const lead = Leads.toLead(req.body);
    const ip = req.get('User-IP');
    lead.set('ip', ip === '::1' ? '67.204.145.178' : ip);
    Leads.post(lead, req.body.url)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
});

router.delete('/', (req, res) => Leads.delete()
    .then(r => res.sendStatus(200))
    .catch(r=> res.sendStatus(500)));

module.exports = router;
