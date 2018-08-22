import Axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Dao {
    constructor(url) {
        window.setInterval(() => this.send(), 500);
        this.url = url;
        this.oldCampaigns = [];
        this.campaigns = [];
    }

    request(method = 'get', url = '', data = {}, headers = {}) {
        url = this.url + url;
        console.log('METHOD: ' + method + ' URL: ' + url + 'DATA: ');
        console.log(data);
        headers = Object.assign(this.getCookies(), headers);
        return Axios({method, url, data , headers});
    }

    getLeads(id, limit, offset) {
        let url = 'leads?id=' + id + '&limit=' + limit + '&offset=' + offset;
        return this.request('get', url);
    }

    get() {
        return this.request('get', 'campaigns');
    }

    getIndex(campaign) {
        let camp = this.campaigns.find(c => c.id === campaign.id)
        let i = this.campaigns.indexOf(camp);
        console.log('INDEX:   ' + i);
        return (i === -1) ? false : i;
    }

    setOldCampaigns(campaigns) {
        if(!Array.isArray(campaigns) || campaigns.length === 0) return;
        let clone = campaigns.slice(0);
        this.oldCampaigns = JSON.parse(JSON.stringify(clone));
    }

    getOldCampaign(campaign) {
        return this.oldCampaigns.find(c => c.id === campaign.id);
    }

    removeCampaign(campaign) {
        const i = this.getIndex(campaign); 
        return this.campaigns.splice(i, 1)[0];
    }

    replace(campaign) {
        const i = this.getIndex(campaign);
        if(i === false) this.campaigns.push(campaign);
        else this.campaigns[i] = campaign;
    }

    put(campaign) {
        let clone = Object.assign({}, campaign);
        this.replace(clone);
    }
    
    send() {
        let campsToSend = [];
        if(this.campaigns.length > 0) {
            this.campaigns.forEach(c => {
                let oldC = this.getOldCampaign(c);
                let newC = {};
                if(oldC) {
                    Object.keys(c)
                        .filter(k => (c[k] !== oldC[k]))
                        .forEach(k => newC[k] = c[k]);
                } else newC = c;
                if(Object.keys(newC).length > 0) {
                    console.log('C.ID');
                    console.log(c.id);
                    newC.id = c.id;
                    console.log('NewC');
                    console.log(newC);
                    campsToSend.push(newC);
                }
            });
        }
        if(Array.isArray(campsToSend) && campsToSend.length > 0 && campsToSend.every(c => Object.keys(c).length > 0)) {
            this.oldCampaigns = this.campaigns;
            this.campaigns = [];
            campsToSend = campsToSend.map(c => {
                let obj = {};
                Object.keys(c)
                    .filter(k => k !== 'leads' && k !== 'isOpen')
                    .forEach(k => obj[k] = c[k]);
                return obj;
            });
            console.log('Campaigns to Send:  ');
            console.log(campsToSend);
            return Promise.all(campsToSend.map(c => this.request('put', 'campaigns', c)));
        }
    }

    post(campaigns) {
        return this.request('post', 'campaigns', campaigns);
    }

    delete(ids) {
        console.log('ID\'s:   ');
        if(!Array.isArray(ids)) ids = [ids]; 
        return this.request('delete', 'campaigns', ids);
    }

    getOldCampaigns() {
        return this.oldCampaigns;
    }

    clearCookies() {
        cookies.remove('session');
        cookies.remove('token');
    }

    cookiesAreSet() {
        return Object.keys(this.getCookies()).length !== 0;
    }

    getCookies() {
        let session = cookies.get('session');
        let token = cookies.get('token');
        if(session && token) return {
            'Session': session,
            'X-CSRF-Token': token
        }
        else return {};
    }

    setToken(token) {
        cookies.set('token', token);
    }

    setSession(session) {
        cookies.set('session', session);
    }

    setCookies(session, token) {
        this.setSession(session);
        this.setToken(token)
    }

    getUserInfo() {
        return this.request('post', 'userinfo');
    }

    logIn(username, password) {
        return this.request('post', 'login', {username, password});
    }

    logOut() {
        return this.request('post', 'logout');
    }

    register(username, email, password) {
        return this.request('post', 'register', { username, email, password });
    }

}