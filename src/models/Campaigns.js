const Utils = require('../Utils');
const Querier = require('./Querier');

const attributes = [
    `name`,`url`,`isEnabled`,`tracking`,`message`,`delay`,`effect`,`location`,`counters`,`initialWait`
];

module.exports = class Campaigns {
    static withUrl(url) {
        return Querier.getCampaignByUrl(url)
            .then(([campaign]) => campaign);
    }

    static idAtUrl(url) {
        return Querier.getCampaignId(url);
    }

    static belongingTo(userId) {
        return Querier.getCampaigns(userId);
    }

    static contentsAtId(id) {
        return Querier.getCampaignById(id)
            .then(([campaign]) => campaign);
    }

    static remove(userId, id) {
        return Querier.deleteCampaign(userId, id);
    }

    static add(userId, name, url) {
        return Querier.addCampaign(userId, name, url)
            .then(({insertId}) => insertId);
    }

    static update(userId, campaignId, campaign) {
        if(!Campaigns.canHave(campaign))
            return Promise.reject('Invalid campaign');
        
        if(typeof userId !== 'number' && typeof userId !== 'long')
            return Promise.reject('Invalid User ID.');


        return Querier.alterCampaign(userId, campaignId, campaign)
    }

    static canHave(campaign) {
        let canHave = true;
        Utils.forEach(campaign, (v, k) => {
            
            if(!attributes.includes(k))
                canHave = false;

        });
        return canHave;
    }
}