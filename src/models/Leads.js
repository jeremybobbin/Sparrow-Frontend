const Querier = require('./Querier');
const apiKey = require('../config').ipstack;


//'http://api.ipstack.com/' + lead.getIp() + '?access_key=' + config.ipstack

module.exports = class Leads {

    static add(campaignId, first, last, email, ip) {

        return Leads.locate(ip)
            .then(({city, region, country}) =>
                Querier.addLead(campaignId, {
                    first, last, email, ip, city, region, country
                })
            );
    }

    static getPage(userId, pageSize, pageNumber, orderParams, campaignId) {
        if(pageSize < 0 || pageSize > 100) {
            throw `Invalid page size: ${pageSize}`;
        }
        if(pageNumber < 0) {
            throw `Invalid page number: ${pageNumber}`;
        }

        return Querier.getLeadsPage(
            userId, pageSize, pageNumber, orderParams, campaignId
        );
    }

    static locate(ip) {
        return fetch('http://api.ipstack.com/' + ip + '?access_key=' + apiKey)
            .then(res => res.json())
            .then(({country_name, region_name, city}) => ({
                city,
                region: region_name,
                country: country_name
            }))
            .catch(() => console.log('Could not locate.'));
    }

}