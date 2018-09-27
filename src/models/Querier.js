const Utils = require('../Utils');
const db = require('./DataBase');

module.exports = class Querier {

    static getCampaignById(id) {
        return db.query(
            `SELECT * FROM campaigns ${Utils.where({ id })}`
        );
    }

    static getCampaignId(url) {
        return db.query(
            `SELECT id FROM campaigns ${Utils.where({ url })};`
        );
    }

    static getCampaignByUrl(url) {
        return db.query(
            `SELECT * FROM campaigns ${Utils.where({ url })}`
        )
    }

    // UserID required for safety.
    static getCampaigns(userId) {
        return db.query(
            `SELECT * FROM campaigns ${Utils.where({ userId })};`
        );
    }

    static deleteCampaign(userId, id) {
        return db.query(
            `DELETE FROM campaigns ${ Utils.where({ userId, id }) };`
        );
    }

    static addCampaign(userId, name, url) {
        return db.query(
            `INSERT INTO campaigns ${Utils.sqlValues({userId, name, url})};`
        );
    }

    static alterCampaign(userId, id, campaign) {
        return db.query(
            `UPDATE campaigns SET ${
                Utils.sqlSet(campaign)
            } ${
                Utils.where({userId, id})
            };`
        );
    }

    static getCampaignMessage(id) {
        return db.query(
            `SELECT message FROM campaigns ${Utils.where({ id })}; `
        );
    }




    static addLead(campaignId, lead) {
        return db.query(
            `INSERT INTO leads ${Utils.sqlValues({campaignId, ...lead})}`
        );
    }
    
    static countLeadPages(userId, pageSize, campaignId) {
        return db.query(
            `SELECT CEILING(COUNT(1) / ${pageSize}) AS pages FROM leads ${
                Utils.where({userId, campaignId})
            };`
        );
    }

    static countLeads(campaignId) {
        return db.query(
            `SELECT COUNT(1) AS count FROM LEADS ${Utils.where({campaignId})};`
        );
    }

    static getLeadsPage(userId, pageSize, pageNumber, orderParams, campaignId) {
        return db.query(
            `SELECT * FROM leads ${ 
                Utils.where({userId, campaignId})
            } ${
                Utils.orderBy(orderParams)
            } ${
                Utils.sqlPage(pageSize, pageNumber)
            };`
        );
    }

    static getLatestLeads(campaignId, limit = 20) {
        return db.query(
            `SELECT * FROM leads ${
                where({ campaignId })
            } ORDER BY time LIMIT ${limit};`
        );
    }



    

    static getFormIds(campaignId) {
        return db.query(
            `SELECT first, last, email FROM formIds ${Utils.where({ campaignId })};`
        );
    }

    static getFormNames(campaignId) {
        return db.query(
            `SELECT first, last, email FROM formNames ${Utils.where({ campaignId })};`
        );
    }


    static setFormIds(campaignId, first, last, email) {
        return db.query(
            `INSERT INTO formIds ${
                Utils.insertOrUpdate({ first, last, email })
            } ${
                Utils.where({ campaignId })
            } ;`
        );
    }

    static setFormNames(campaignId, first, last, email) {
        return db.query(
            `INSERT INTO formNames ${
                Utils.insertOrUpdate({ first, last, email })
            } ${
                Utils.where({ campaignId })
            } ;`
        );
    }
}