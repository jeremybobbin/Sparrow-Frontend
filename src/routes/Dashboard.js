import React from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';

import jeRequest from '../models/jeRequest';
import Layout from '../Layout';
import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';
import LeadList from '../components/LeadList';
import dao from '../models/Dao';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            redirectPath: null,
        };
    }

    componentDidMount() {
        if(dao.cookiesAreSet()) {
            dao.get()
                .then(r => this.set(s => {
                    r.data.forEach(c => c.enabled = (c.enabled === 1 ? true : false));
                    s.campaigns = r.data || [];
                    if (!s.campaigns) s.campaigns = [];
                    return s;
                }))
                .catch(r => {
                    this.set(s => {
                        s.campaigns = [{
                            name: 'Jer',
                            url: 'https://www.jer.com',
                            enabled: true
                        }];
                        return s;
                    });
                })
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
            .then(r => this.set(s => {
                campaign.id = r.data;
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
        console.log(id);
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

    toLeads(id) {
        this.set(s => {
            s.redirect = id;
            return s;
        });
    }

    renderRedirect() {
        if(this.state.redirect && this.state.redirectPath === null) return <Redirect to={{
            pathname: '/leads',
            state: { id: this.state.redirect }
        }}/>;
        if(this.state.redirect && this.state.redirectPath) return <Redirect to={{
            pathname: this.state.redirectPath
        }}
        />;
    }

    render() {
        return (
            <Layout>
                <div className='dashboard'>
                    {this.renderRedirect()}
                    <CardAdder add={(name, url) => this.addCampaign(name, url)}/>
                    <CampaignList
                        toggleSettings={id => this.toggleSettings(id)}
                        campaigns={this.state.campaigns}
                        remove={id => this.removeCampaign(id)}
                        update={(id, k, v) => this.update(id, k, v)}
                        toLeads={(id) => this.toLeads(id)}
                    />
                </div>
            </Layout>
        ); 
    }
}