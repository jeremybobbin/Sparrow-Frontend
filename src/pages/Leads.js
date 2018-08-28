import React from 'react';

import dao from '../utils/Dao';
import LeadList from '../components/LeadList';
import Layout from '../components/Layout';

export default class Leads extends React.Component {
    constructor(props) {
        super();
        let {random, location} = props;
        this.id = location.state ? location.state.id : null;
        this.loaded = 0;
        this.state = {
            limit: 15,
            leads: [
                {
                    first: 'Jer',
                    last: 'Guy',
                    email: 'jeremybobbin@gmail.com',
                    ip: '6',
                    city: 'Florlando'
                }
            ],
        };
    }

    set(callback) {
        let state = callback(this.state);
        return new Promise(resolve =>
            this.setState(state, resolve()));
    }

    componentWillMount() {
        this.nextPage();
    }

    nextPage() {
        return dao.getLeads(this.id, this.state.limit, this.loaded)
            .then(r => this.set(s => {
                r.data.forEach(lead => {
                    console.log(lead);
                    s.leads.push(lead)});
                this.loaded += r.data.length;
                console.log('S.LEADS');
                console.log(s.leads);
                return s;
            }));
    }

    handleScroll(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) this.nextPage();
    }

    

    render() {
        return (
            <div>
                <LeadList leads={this.state.leads} />
            </div>
        )
    }
}