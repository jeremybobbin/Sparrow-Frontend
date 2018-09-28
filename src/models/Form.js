const Querier = require('./Querier');
const Utils = require('../Utils');

module.exports = class Form {
    
    static toObject(names, ids) {
        if(!ids) ids = { first: null, last: null, email: null };
        if(!names) names = { first: null, last: null, email: null };

        return {
            first: {
                id: ids.first,
                name: names.first
            },
            last: {
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
        .then(result => {
            const [idResult, nameResult] = result;
            const ids = idResult[0];
            const names = nameResult[0];
            return Form.toObject(names, ids)
        });
    }

    static setFields(campaignId, object) {
        
        const canAccept = Form.canAccept(object);

        if(!canAccept) {
            return Promise.reject();
        }

        const { id, name } = Form.deriveFeilds(object);
        return Promise.all([
            Querier.setFormIds(campaignId, id.first, id.last, id.email),
            Querier.setFormNames(campaignId, name.first, name.last, name.email),
        ]);
    }

    static deriveFeilds(object) {
        const { first, last, email } = object;

        const name = {
            first: first.name,
            last: last.name,
            email: email.name,
        };
        const id = {
            first: first.id,
            last: last.id,
            email: email.id,
        };

        return { id, name };
    }

    static canAccept(object) {
        if(Utils.hasKeys([object], ['first', 'last', 'email'])) {
            const { first, last, email } = object;
            if(Utils.hasKeys([first, last, email], ['id', 'name'])) {
                return true;
            }
        }
        return false;
    }

}