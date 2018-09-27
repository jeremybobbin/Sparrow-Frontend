const router = require('express').Router();

const Campaigns = require('../models/Campaigns');
const Fields = require('../models/Fields');

const Form = require('../models/Form');

const { UserRoute } = require('../JerWear');

router.get('/', (req, res) => {
    const { userId } = req;

	Campaigns.belongingTo(userId)
        .then(campaigns => res.json({ campaigns }))
        .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Promise.all([Campaigns.contentsAtId(id), Form.getFields(id)])
        .then(([config, fields]) => {
            res.json({...config, ...fields});
        })
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { userId, body } = req;
    
    Campaigns.update(userId, id, body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    const { userId, body } = req;
    const { name, url } = body;

    Campaigns.add(userId, name, url)
        .then(id => res.json({ id }))
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    return Campaigns.delete(userId, id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json(err));
});

module.exports = router;

// FIELDS OBJECT: z
// firstname: {
//     id: ids.first,
//     name: names.first
// },
// lastname: {
//     id: ids.last,
//     name: names.last
// },
// email: {
//     id: ids.email,
//     name: names.email
// }