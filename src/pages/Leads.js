import React from 'react';

import dao from '../utils/Dao';
import LeadList from '../components/LeadList';

export default class Leads extends React.Component {
    constructor(props) {
        super();
        let {random, location} = props;        
        this.id = Number.parseInt(location.pathname.split('/')[2]);
        console.log('ID:   ' + this.id);
        this.loaded = 0;
        this.state = {
            limit: 15,
            leads: [],
        };
    }

    set(callback) {
        let state = callback(this.state);
        return new Promise(resolve =>
            this.setState(state, resolve));
    }

    componentWillMount() {
        this.nextPage();
    }

    
    componentDidMount() {
        window.addEventListener('scroll', (e) => this.handleScroll(e));
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', (e) => this.handleScroll(e));
    }

    nextPage() {
        if(!this.end) return dao.getLeads(this.id, this.state.limit, this.loaded)
            .then(({data}) => {
                if(data.length === 0) return this.end = true; 
                this.set(s => {
                    data.forEach(lead => {
                        console.log(lead);
                        s.leads.push(lead)});
                    this.loaded += data.length;
                    return s;
                })});
    }

    handleScroll(e) {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) this.nextPage();
    }

    

    render() {
        return (
            <div onScroll={(e) => this.handleScroll(e)}>
                <LeadList leads={this.state.leads} />
            </div>
        )
    }
}