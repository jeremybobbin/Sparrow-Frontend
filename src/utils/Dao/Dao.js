import Axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export default class Dao {
    constructor(url) {
        this.url = url;
        this.campaigns = [];
    }


    //Custom request method for appending authentication headers.
    request(method = 'get', path = '', data = {}, headers = {}) {
        const url = this.url + path;

        headers.session = this.getSession();
        headers.token = this.getToken();

        return Axios({method, url, data, headers})
            .then(res => {

                if(res.status === 401)
                    this.clearCookies();

                return res;
            });
    }

    getLeads(id, limit, offset) {

        const url = `leads?id=${id}&limit=${limit}&offset=${offset}`;

        return this.request('get', url);
    }


    // Returns array of campaigns
    getCampaigns() {
        return this.request('get', 'campaigns')
            .then(({data}) => data);
    }


    // It is put it <3
    put(campaign) {
        return this.request('put', 'campaigns', campaign)
            .then(({data}) => data.id);
    }


    // Takes name, url, returns new campaignID.
    post(name, url) {
        return this.request('post', 'campaigns', {name, url})
            .then(({data}) => data.id);
    }

    delete(ids) {
        
        if(!Array.isArray(ids)) ids = [ids];

        return this.request('delete', 'campaigns', ids);
    }

    clearCookies() {
        cookies.remove('session');
        cookies.remove('token');
    }

    getSession() {
        return cookies.get('session');
    }

    getToken() {
        return cookies.get('token');
    }

    setCookies(session, token) {
        cookies.set('session', session);
        cookies.set('token', token);
    }

    setSession(session) {
        cookies.set('session', session);
    }

    logIn(username, password) {

        const requestArgs =
            username && password ?
                ['user/login', {username, password}]
                :
                ['user/info'];
            

        return this.request('post', ...requestArgs)
            .then(response => {

                const {session, token, username, email} = response.data;
                this.setCookies(session, token);

                return {username, email};
            });
    }

    // Takes nothing, returns nothing. Always clears cookies
    logOut() {
        return this.request('post', 'user/logout')
            .finally(() => this.clearCookies());
    }


    // Takes username, email and password, returns UNKNOWN
    register(username, email, password) {
        return this.request('post', 'user/register', { username, email, password })
            .then(({ data }) => {
                this.setSession(data.session)
            });
    }

}