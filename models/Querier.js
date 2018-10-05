const Utils = require('../Utils');
const { db, bDb } = require('./Dao');

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




    /*
        'CREATE TABLE IF NOT EXISTS leads ( \
        `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
        `campaignId` int NOT NULL, \
        `ip` varchar(255) NOT NULL, \
        `first` varchar(255), \
        `last` varchar(255), \
        `email` varchar(255), \
        `city` varchar(255), \
        `region` varchar(255), \
        `country` varchar(255), \
        `time` DATETIME DEFAULT CURRENT_TIMESTAMP, \
        `soundId` INT NOT NULL \
    */

    static addLead(campaignId, lead) {
        return db.query(
            `INSERT INTO leads ${Utils.sqlValues({campaignId, ...lead})};`
        );
    }
    
    static countLeadPages(userId, pageSize, campaignId) {
        return db.query(
            `SELECT CEILING(COUNT(1) / ${pageSize}) AS pages FROM leads ${
                Utils.where({ campaignId })
            };`
        );
    }

    static countLeads(campaignId) {
        return db.query(
            `SELECT COUNT(1) AS count FROM LEADS ${Utils.where({campaignId})};`
        );
    }

    // User ID is redundent now but may be necessary later.
    static getLeadsPage(userId, pageSize, pageNumber, orderParams, campaignId) {
        console.log('\n\n\n\nCalling from QUERIER \n\n\n\n');
        return db.query(
            `SELECT * FROM leads ${ 
                Utils.where({ campaignId })
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
                Utils.where({ campaignId })
            } ORDER BY time LIMIT ${limit};`
        );
    }

    static streamLeadsByCampaign(campaignId) {
        return db.getConnection()
            .then(conn => conn.query(
                `SELECT ip, first, last, email, city, region, country, time \
                FROM leads ${Utils.where({ campaignId })};`
            ).stream({ highWaterMark: 5 }))
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
                Utils.insertOrUpdate({ campaignId, first, last, email })
            };`
        );
    }

    static setFormNames(campaignId, first, last, email) {
        return db.query(
            `INSERT INTO formNames ${
                Utils.insertOrUpdate({ campaignId, first, last, email })
            };`
        );
    }

    static getBillingInfo(uid) {
        return bDb.query(
            `SELECT o.order_status AS status, o.order_total AS total, \
            o.created AS created, o.payment_method AS method \
            FROM uc_orders AS o \
            JOIN uc_order_products AS op ON o.order_id = op.order_id \
            JOIN uc_products AS p ON op.nid = p.nid \
            JOIN uc_product_features AS pf ON p.nid = pf.nid \
            ${Utils.where({ 'o.uid': uid })} \
            ORDER BY o.created DESC;`);
    }

    static log(ip, message) {
        if(!ip) ip = "NULL";
        if(!message) message = "NULL";
        return db.query(
            `INSERT INTO logs (ip, message) VALUES ("${ip}", "${message}");`
        );
    }

    static getLogs() {
        return db.query(
            `SELECT * FROM logs ORDER BY time DESC LIMIT 50;`
        );
    }


}