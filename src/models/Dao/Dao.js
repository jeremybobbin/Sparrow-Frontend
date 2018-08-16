import Axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Dao {
    constructor(url) {
        window.setInterval(() => this.send(), 3000);
        this.url = url;
        this.oldCampaigns = [];
        this.campaigns = [];
    }

    request(method = 'get', url = '', data = {}, headers = {}) {
        url = this.url + url;
        headers = Object.assign(this.getCookies(), headers);
        return Axios({method, url, data, headers});
    }

    get() {
        return this.request('get', 'campaigns');
    }

    getIndex(campaign) {
        console.log('ALL CAMPAIGNS');
        console.log(this.campaigns);
        console.log('CAMPAIGN FROM getIndex()');
        console.log(campaign);
        let camp = this.campaigns.find(c => c.id === campaign.id)
        console.log('OLD CAMPAIGN WITH SAME ID');
        console.log(camp);
        let i = this.campaigns.indexOf(camp);
        console.log('INDEX:   ' + i);
        return (i === -1) ? false : i;
    }

    setOldCampaigns(campaigns) {
        this.oldCampaigns = campaigns.map(c => ({...c}));
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
        console.log('INDEX:   '+ i);
        if(i) this.campaigns[i] = campaign;
        else this.campaigns.push(campaign);
    }

    put(campaign) {
        let c = {...campaign};
        this.replace(c);
    }
    
    send() {
        let campsToSend = [];
        if(this.campaigns.length > 0) {
            this.campaigns.forEach(c => {
                let oldC = this.getOldCampaign(c);
                let newC = {};
                if(oldC) {
                    Object.keys(c)
                        .filter(k => c[k] !== oldC[k] && k !== 'isOpen')
                        .forEach(k => newC[k] = c[k]);
                } else newC = c;
                if(Object.keys(newC).length > 0) {
                    newC.id = c.id;
                    campsToSend.push(newC);
                }
            });
        }
        console.log(campsToSend);
        if(campsToSend.length > 0 && campsToSend.every(c => Object.keys(c).length > 0)) {
            this.oldCampaigns = this.campaigns;
            this.campaigns = [];
            return Promise.all(campsToSend.map(c => this.request('put', 'campaigns', c)));
        }
    }

    post(campaigns) {
        return this.request('post', 'campaigns', campaigns);
    }

    delete(ids) {
        return this.request('delete', 'campaigns', ids);
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