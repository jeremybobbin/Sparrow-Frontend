const Utils = require('../Utils');
const Querier = require('./Querier');

const attributes = [
    `id`,`userId`,`name`,`url`,`isEnabled`,`tracking`,`message`,`delay`,`effect`,`location`,`counters`,`initialWait`
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
        Querier.addCampaign(userId, name, url)
            .then(([{insertId}]) => {
                if(!insertId) {
                    console.log('Campaign\'s Insert ID is null');
                }
                return insertId;
            });
    }

    static update(userId, campaignId, campaign) {
        if(!Campaigns.canHave(campaign))
            throw 'Invalid campaign';

        
        return Querier.alterCampaign(userId, campaignId, campaign)
    }

    static canHave(campaign) {
        Utils.forEach(campaign, (v, k) => {
            
            if(!attributes.includes(k))
                return false;

        });
        return true;
    }
}