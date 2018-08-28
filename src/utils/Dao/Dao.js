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
        let cookies = this.getCookies();
        headers = Object.assign(cookies, headers);
        let opt = {method, url, data , headers};
        return Axios(opt);
    }

    getLeads(id, limit, offset) {
        let url = 'leads?id=' + id + '&limit=' + limit + '&offset=' + offset;
        return this.request('get', url);
    }

    getCampaigns() {
        return this.request('get', 'campaigns')
            .then(r => r.data === false ? null : r.data);
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
                    newC.id = c.id;
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
        return this.request('post', 'user/userinfo');
    }

    logIn(username, password) {
        console.log('Username:  ' + username);
        console.log('Password: ' + password);
        if(username === undefined && password === undefined) {
            return this.getUserInfo()
                .then(({data}) => data.username);
        }
        return this.request('post', 'user/login', {username, password})
            .then(({data}) => data.username);

    }

    logOut() {
        return this.request('post', 'user/logout');
    }

    register(username, email, password) {
        return this.request('post', 'user/register', { username, email, password });
    }

}