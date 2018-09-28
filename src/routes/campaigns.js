const router = require('express').Router();

const Campaigns = require('../models/Campaigns');
const Form = require('../models/Form');

const { UserRoute } = require('../JerWear');

router.param('id', (req, res, next, id) => {
    req.params.id = parseInt(id);
    next();
});

router.get('/', UserRoute, (req, res) => {
    const { userId } = req;

    console.log('UserID -> ', userId);

	Campaigns.belongingTo(userId)
        .then(campaigns => res.json({ campaigns }))
        .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Promise.all([Campaigns.contentsAtId(id), Form.getFields(id)])
        .then(([config, fields]) => {
            console.log('THEN');
            res.json({...config, ...fields});
        })
        .catch(err => {
            console.log('CATCH');
            console.log(err);
            res.status(500).json({err})
        });
});


// Route for modifying campaigns.
router.put('/:id', UserRoute, (req, res) => {
    const { id } = req.params;
    const { userId, body } = req;
    
    Campaigns.update(userId, id, body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    return Campaigns.delete(userId, id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json(err));
});

// For post form information about campaign.
router.post('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;

    console.log('Type Of ID: ' + typeof id);

    Form.setFields(id, body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json(err));
});

// Route to render widget.
router.get('/:id/widget', (req, res) => {
    const { id } = req.params;

    Widget.getSnippets(id, random)
        .then(snippets => res.render('widget.pug', snippets))
        .catch(err => res.status(500).json({ err }));
});

router.post('/', UserRoute, (req, res) => {
    const { userId, body } = req;
    const { name, url } = body;

    Campaigns.add(userId, name, url)
        .then(id => res.json({ id }))
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