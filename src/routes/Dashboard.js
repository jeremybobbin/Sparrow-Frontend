import React from 'react';
import Axios from 'axios'

import Layout from '../Layout';
import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';

const campaigns = [
    {
        id: 5,
        name: 'RTO',
        url: 'www.google.com',
        leads: 501,
        on: true,
        placement: 1,
        message: 'Has just signed up for XYZ'
    },
    {
        id: 112,
        name: 'HOPE',
        url: 'www.example.com',
        leads: 6593,
        on: false,
        placement: 0,
        message: 'Has just signed up for XYZ'
    },
    {
        id: 8,
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
        on: true,
        placement: 2,
        message: 'Has just signed up for XYZ'
    },
    {
        id: 1,
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
        on: true,
        placement: 3,
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
        this.setState({
            ...this.state,
            interval: setInterval(() => this.check(), 5000)
        });
    }

    check() {
        if(this.state.changed) this.updateApi();
    }

    updateApi() {
        Axios.post('/', this.state.campaings)
            .then(() => {
                console.log('Successfully updated.');
                this.set(state => state.changed = false);
            })
            .catch(err => {
                console.log('There was a problem connecting to the server.' + err);
                clearInterval(this.state.interval);
            });
    }

    getCampaign(id) {
        return this.state.campaigns.find(c => c.id === id);
    }

    getIndex(id) {
        return this.state.campaigns.indexOf(this.state.campaigns.find(c => c.id === id));
    }

    addCampaign(name, url) {
        const campaigns = this.state.campaigns;
        campaigns.unshift({
            name,
            url,
            id: (Math.random() * 1000),
            leads: 0
        });
        console.log(campaigns);
        this.setState({ campaigns });
    }

    toggle(id) {
        this.setCampaign(id, c => {
            c.on = !c.on;
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
        this.set(state => {
            let i = this.getIndex(id);
            let campaigns = state.campaigns;
            if(!(campaigns[i] = callback(campaigns[i]))) campaigns.splice(i, 1);
            return state;
        });
    }

    removeCampaign(id) {
        this.setCampaign(id, (c) => c = null);
    }

    update(id, k, v) {
        this.setCampaign(id, c => {
            c[k] = v;
            return c;
        });
    }

    render() {
        return (
            <Layout>
                <div className='dashboard'>
                    <CardAdder add={(name, url) => this.addCampaign(name, url)}/>
                    <CampaignList
                        toggleSettings={id => this.toggleSettings(id)}
                        campaigns={this.state.campaigns}
                        toggle={id => this.toggle(id)}
                        remove={id => this.removeCampaign(id)}
                        update={(id, k, v) => this.update(id, k, v)}
                    />
                </div>
            </Layout>
        ); 
    }
}