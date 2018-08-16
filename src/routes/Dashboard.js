import React from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

import jeRequest from '../models/jeRequest';
import Layout from '../Layout';
import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';
import dao from '../models/Dao';


const campaigns = [
    {
        id: 5,
        name: 'RTO',
        url: 'www.google.com',
        leads: 501,
        enabled: true,
        tracking: true,
        location: 1,
        message: 'Has just signed up for XYZ'
    },
    {
        id: 112,
        name: 'HOPE',
        url: 'www.example.com',
        leads: 6593,
        enabled: true,
        tracking: true,
        location: 0,
        message: 'Has just signed up for XYZ'
    },
    {
        id: 8,
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
        enabled: true,
        tracking: true,
        location: 2,
        message: 'Has just signed up for XYZ'
    },
    {
        id: 1,
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
        enabled: true,
        tracking: true,
        location: 3,
        message: 'Has just signed up for XYZ'
    },
];

campaigns.forEach(c => c.isOpen = false);

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changed: false,
            campaigns
        };
    }

    componentDidMount() {
        if(dao.cookiesAreSet()) {
            dao.get()
                .then(r => this.set(s => {
                    s.campaigns = r;
                    return s;
                }))
                .catch(r => console.log(r))
                .then(() => dao.setOldCampaigns(this.state.campaigns));
        }
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
            .then(id => this.set(s => {
                campaign.id = id;
                s.campaigns.push(campaign);
                return s;
            }));
    }

    toggle(id) {
        this.setCampaign(id, c => {
            c.enabled = !c.enabled;
            return c;
        }); 
    }

    toggleSettings(id) {
        this.setCampaign(id, (c) => {
            c.isOpen = !c.isOpen;
            return c;
        });
    }

    set(callback) {
        let state = callback(this.state);
        state.changed = true;
        return new Promise(resolve => {
            this.setState(state, resolve())
        });
    }

    setCampaign(id, callback) {
        return this.set(state => {
            let i = this.getIndex(id);
            let campaigns = state.campaigns;
            if(!(campaigns[i] = callback(campaigns[i]))) campaigns.splice(i, 1);
            return state;
        });
    }

    removeCampaign(id) {
        this.setCampaign(id, (c) => c = null)
            .then(() => dao.delete(id));
    }

    update(id, k, v) {
        let newCampaign;
        this.setCampaign(id, c => {
            c[k] = v;
            newCampaign = c;
            return c;
        }).then(() => dao.put(newCampaign));
    }

    render() {
        return (
            <Layout>
                <div className='dashboard'>
                    <h1 onClick={() => console.log(this.state.campaigns)}>Debug</h1>
                    <CardAdder add={(name, url) => this.addCampaign(name, url)}/>
                    <CampaignList
                        toggleSettings={id => this.toggleSettings(id)}
                        campaigns={this.state.campaigns}
                        remove={id => this.removeCampaign(id)}
                        update={(id, k, v) => this.update(id, k, v)}
                    />
                </div>
            </Layout>
        ); 
    }
}