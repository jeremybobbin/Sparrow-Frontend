const Querier = require('./Querier');

module.exports = class Form {
    
    static toObject(names, ids) {
        return {
            firstname: {
                id: ids.first,
                name: names.first
            },
            lastname: {
                id: ids.last,
                name: names.last
            },
            email: {
                id: ids.email,
                name: names.email
            }
        }
    }

    static getFields(campaignId) {
        return Promise.all([
            Querier.getFormIds(campaignId),
            Querier.getFormNames(campaignId)
        ])
        .then(([[ids], [names]]) => Form.toObject(names, ids));
    }

    static setFields(campaignId, object) {
        const id = Form.getIds(object);
        const name = Form.getNames(object);
        return Promise.all([
            Querier.setFormIds(campaignId, id.first, id.last, id.email),
            Querier.setFormNames(campaignId, name.first, name.last, name.email),
        ]);
    }

    static getIds({firstname, lastname, email}) {
        return {
            first: firstname.id,
            last: lastname.id,
            email: email.id
        };
    }

    static getNames({firstname, lastname, email}) {
        return {
            first: firstname.name,
            last: lastname.name,
            email: email.name
        };
    }
}