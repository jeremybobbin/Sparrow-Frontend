import React from 'react';
import Layout from '../Layout';
import CardAdder from '../components/CardAdder';
import CampaignList from '../components/CampaignList';

const campaigns = [
    {
        id: 5,
        name: 'RTO',
        url: 'www.google.com',
        leads: 501,
    },
    {
        id: 112,
        name: 'HOPE',
        url: 'www.example.com',
        leads: 6593,
    },
    {
        id: 8,
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
    },
    {
        id: 1,
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
    },
];


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { campaigns };
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

    removeCampaign(id) {
        this.setState({ campaigns: this.state.campaigns.filter(c => c.id !== id)});
    }

    render() {
        return (
            <Layout>
                <div className='dashboard'>
                    <CardAdder add={(name, url) => this.addCampaign(name, url)}/>
                    <CampaignList 
                        campaigns={this.state.campaigns}
                        remove={(id) => this.removeCampaign(id)}    
                    />
                </div>
            </Layout>
        ); 
    }
}