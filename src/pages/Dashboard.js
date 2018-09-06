import React from 'react';

import Layout from '../components/Layout';
import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';
import dao from '../utils/Dao';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.loadCampaigns = props.loadCampaigns;
        this.redirect = props.redirect;

        this.state = {
            changed: false,
            campaigns: []
        };
        this.loadCampaigns()
            .then(campaigns => this.set(s => {
                s.campaigns = campaigns.map(c => {
                    c.isOpen = false
                    return c;
                });
                return s;
            }))
            .catch(() => console.log('Unfortunate'));
    }

    check() {
        if(this.state.changed) this.updateApi();
    }

    updateApi() {
        console.log('UpdateAPI() has been called');
    }

    getCampaign(id) {
        let campaign = this.state.campaigns.find(c => c.id === id);
        delete campaign.isOpen;
        return campaign;
    }

    getIndex(id) {
        return this.state.campaigns.indexOf(this.state.campaigns.find(c => c.id === id));
    }

    addCampaign(name, url) {
        const campaign = {
            name,
            url,
            leads: 0
        };
        dao.post(campaign)
            .then(({data}) => this.set(s => {
                campaign.id = data;
                s.campaigns.push(campaign);
                return s;
            }));
    }

    toggle(id, prop) {
        this.setCampaign(id, c => {
            c[prop] = !c[prop];
            return c;
        });
    }

    set(callback) {
        let state = callback(this.state);
        state.changed = true;
        return new Promise(resolve => {
            this.setState(state, resolve)
        });
    }

    setCampaign(id, callback) {
        return this.set(s => {
            const campaign = s.campaigns.find(c => c.id === id);
            const index = s.campaigns.indexOf(campaign);
            let newCampaign = callback(campaign);
            dao.put(newCampaign);
            if(newCampaign === null) {
                s.campaigns = s.campaigns.filter(c => c.id !== id);
                dao.delete(id);
            } else s.campaigns[index] = newCampaign;
            return s;
        });
    }

    removeCampaign(id) {
        dao.delete(id)
            .then(this.setCampaign(id, (c) => c = null))
            .catch((e) => console.log(e));
    }

    update(id, k, v) {
        let newCampaign;
        this.setCampaign(id, c => {
            c[k] = v;
            newCampaign = c;
            return c;
        }).then(() => dao.put(newCampaign));
    }

    toLeads(id) {
        this.redirect('/leads/' + id);
    }

    render() {
        return (
            <div className='dashboard'>
                <CardAdder add={(name, url) => this.addCampaign(name, url)}/>
                <CampaignList
                    toggle={(id, prop) => this.toggle(id, prop)}
                    campaigns={this.state.campaigns}
                    remove={id => this.removeCampaign(id)}
                    update={(id, k, v) => this.update(id, k, v)}
                    toLeads={(id) => this.toLeads(id)}
                />
            </div>
        ); 
    }
}


#!/usr/bin/env node

const http = require("http");
const URL = require('url');

const urls = process.argv.slice(2);
const apiKey = "AIzaSyCE0iHYqqI_GvqAAncd1qqFb55t6_FKh5o";
const apiUrl = "https://www.googleapis.com/urlshortener/v1/url?key=" + apiKey;

shortenAll(urls)
    .then(r => r.forEach(a => console.log(a)))
    .catch(err => console.log(err));


function shorten(longUrl) {
    return new Promise((resolve, reject) => {
        const method = "POST";
        const hostname = 'www.googleapis.com'
        const path = '/urlshortener/v1/url?key=' + apiKey;
        const headers = {"Content-Type": "application/json"};
        const ecdhCurve = 'auto'
        const options = {method,hostname,path,headers, ecdhCurve};

        const req = http.request(options, (res) => {
            const chunks = [];

            res.on("data", (chunk) => {
                chunks.push(chunk);
            });

            res.on("end", () => resolve(chunks));
        });

        req.on('error', reject);
        req.write(JSON.stringify({ longUrl }));
        req.end();
    });
}

async function shortenAll(urls) {
	const shortUrls = [];
	for (const url of urls) {
            const shortUrl = await shorten(url);
            shortUrls.push(shortUrl.toString());
	}
	return shortUrls;
}
