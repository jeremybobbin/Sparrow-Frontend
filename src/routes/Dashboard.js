import React from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

import jeRequest from '../models/jeRequest';
import Layout from '../Layout';
import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';

const cookies = new Cookies();

function getCookies() {
    let session = cookies.get('session');
    let token = cookies.get('token');
    if(session && token) return {
        'Session': session,
        'X-CSRF-Token': token
    }
    else return {};
}

const request = (method, data) => {
    // let options = {
    //     method,
    //     headers: getCookies(),
    //     url: 'http://localhost:3001/campaigns'
    // };
    // console.log(options);
    // return Axios(options);
    return jeRequest[method](null, data, getCookies());
}

const get = () => {
    return request('get')
}

const put = (campaign) => request('put', campaign);

const post = (campaigns) => request('post', campaigns);

const del = (ids) => request('delete', ids);


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
        get().then(r => console.log(r)); 
            // this.set(s => {
            //     s.campaigns = r;
            //     s.interval = setInterval(() => this.check(), 5000)
            //     return s;
            // })).catch(r => console.log(r));
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
        this.setState({ campaigns });
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