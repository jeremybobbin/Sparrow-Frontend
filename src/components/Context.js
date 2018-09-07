import React from 'react';
import { Redirect } from 'react-router-dom'; 
import { Promise } from 'es6-promise';

import dao from '../utils/Dao';


const Context = React.createContext();


export const Injector = (Component) => {
    return (props) => {
        <Context.Consumer>
             {(context) => 
                <Component 
                    {...props}
                    context={context} />
             }}
        </Context.Consumer>
    }
 }


// Cooldown time on this.update() in milliseconds.
const cooldown = 500;

export class Provider extends React.Component {

    constructor(props) {
        super(props);
        

        // Determines whether campaigns can be updated.
        this.isOnCooldown = false;
        

        // Array of campaign id's which haven't been updated with the API.
        this.idsOfAlteredCampaigns = [];

        this.redirectPath = '';
        this.state = {
            campaigns: [],
            isLoggedIn: false,
            username: '',
            email: '',
            message: '',
        };
    
        this.logIn()
            .then(this.getCampaigns);
    }


    getCampaigns() {
        return dao.getCampaigns()
            .then(freshCampaigns => this.set(({campaigns}) => {
                campaigns = freshCampaigns;
            }));
    }

    toggle(campaignId, prop) {
        this.set(state => {
            const campaign = this.getCampaignById(campaignId, state);
            campaign[prop] = !campaign[prop];
        });
    }

    update(campaignId, k, v) {
        if(!this.canUpdate(campaignId)) return;
    }

    post(name, url) {
        return dao.post(name, url)
            .then(id => this.set(({campaigns}) => campaigns.push({id, name, url})));
    }


    // Takes an array or an int
    remove(idsForDeletion) {
        if(typeof idsForDeletion === 'int') idsForDeletion = [idsForDeletion];

        this.set(({campaigns}) => 
            campaigns.filter(({ id }) => !idsForDeletion.includes(id))
        );
    }



    logIn(usernameAttempt, password) {

        return dao.logIn(usernameAttempt, password)
            .then(userInfo => this.set(({username, email, isLoggedIn}) => {

                username = userInfo.username;
                email = userInfo.email;

                isLoggedIn = true;

            }))
            .catch(({response}) => this.set(({isLoggedIn, message}) => {
                let status;
                if(
                    typeof response === 'object' &&
                    response.hasOwnProperty('status')
                ) {
                    status = response.status;
                }

                isLoggedIn = false;
                message = 'There was an issue connedong to the server.';
            }));
    }

    register(username, email, password) {
        return dao.register(username, email, password)
            .then(() => this.set(state => {
                state.username = username;
                state.email = email;
                state.isLoggedIn = true;
            }))
            .catch();
    }

    
    redirect(url) {
        console.log('Redirect called');
        this.redirectPath = url;
        this.forceUpdate();
    }


    // Can take a reference of state, and can return a reference to the campaign with that ID
    getCampaignById(id, state = this.state) {
        return state.campaigns
            .find(campaign => campaign.id === id);
    }

    getAlteredCampaigns() {
        const campaigns = [];

        while(this.idsOfAlteredCampaigns.length > 0) {

            const id = this.idsOfAlteredCampaigns.shift();
            const campaign = this.getCampaignById(id);

            campaigns.push(campaign);
        }

        return campaigns;
    }

    canUpdate(campaignId) {
        if(this.isOnCooldown) {
            this.idsOfAlteredCampaigns.push(campaignId);
            return false;
        }

        this.isOnCooldown = true;
        this.timout = setTimeout(() => {
            this.isOnCooldown = false;
        }, cooldown);

        return true;
    }


    // Asyncronously update Sparrow API with altered campaigns
    pushChangedCampaigns() {
        const campaigns = this.getAlteredCampaigns();
        return Promise.all(campaigns.map(campaign => {

        }));
    }

    // Gets state reference and passes it to the callback.
    set(callback) {
        const stateRef = {...this.state};
        
        callback(stateRef);

        return new Promise(resolve =>
            this.setState(stateRef, resolve)
        );
    }


    setMessage(message) {
        return this.set(state =>
            state.message = message
        );
    }

    
    renderRedirect() {
        const path = this.redirectPath; 

        if(path === '') return;
        this.redirectPath = '';

        return <Redirect to={path} />;
    }


    render() {
        return (
            <Context.Provider value={{ 
                state: this.state,

                Campaigns: {
                    update: (campaignId, k, v) => this.update(campaignId, k, v),
                    post: (name, url) => this.post(name, url),
                    remove: (campaignId) => this.remove(campaignId),
                },

                User: {
                    logIn: (user, pass) => this.logIn(user, pass),
                    logOut: () => this.logOut(),
                    register: (user, email, pass) => this.register(user, email, pass),
                    redirect: (url) => this.redirect(url),
                    setMessage: (message) => this.setMessage(message)
                }
            }}>
                <h1 onClick={() => this.redirect('/dashboard')}>DEBUG</h1>
                {this.renderRedirect()}
                {this.props.children}
            </Context.Provider>
        );
    }
}

