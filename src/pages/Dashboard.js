import React from 'react';

import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.loadCampaigns = props.loadCampaigns;
        this.redirect = props.redirect;

        this.state = {
            changed: false,
            campaigns: []
        };
    }


    toLeads(id) {
        this.redirect('/leads/' + id);
    }

    render() {
        return (
            <div className='dashboard'>
                <CardAdder add={(name, url) => this.addCampaign(name, url)}/>
                <CampaignList/>
            </div>
        ); 
    }
}


//Campaign List props: 
// toggle={(id, prop) => this.toggle(id, prop)}
// campaigns={this.state.campaigns}
// remove={id => this.removeCampaign(id)}
// update={(id, k, v) => this.update(id, k, v)}
// toLeads={(id) => this.toLeads(id)}