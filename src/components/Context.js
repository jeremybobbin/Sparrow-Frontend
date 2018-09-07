import React from 'react';
import { Redirect } from 'react-router-dom'; 
import { Promise } from 'es6-promise';

import dao from '../utils/Dao';


const Context = React.createContext();


// Cooldown time on this.update() in milliseconds.
const cooldown = 1000;


const {Consumer} = Context;

export const Inject = (Component, ...propsToInject) => {
    return (props) => 
        <Consumer>
             {(context) => {

                const filteredContext = {};
                propsToInject.forEach(prop => {
                    filteredContext[prop] = context[prop];
                });

                return <Component {...props} {...filteredContext} />
             }}
        </Consumer>;
}   


export class Provider extends React.Component {

    constructor(props) {
        super(props);
        

        // Determines whether campaigns can be updated.
        this.isOnCooldown = false;

        this.timeoutIsSet = false;

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
        this.alteredCampaign(campaignId);
        this.set(state => {
            const campaign = this.getCampaignById(campaignId, state);
            campaign[prop] = !campaign[prop];
        });
    }

    update(campaignId, k, v) {
        this.alteredCampaign(campaignId);
        this.set(state => {
            const campaign = this.getCampaignById(campaignId, state)
            campaign[k] = v;
        });

    }

    alteredCampaign(id) {
        if(!this.idsOfAlteredCampaigns.includes(id))
            this.idsOfAlteredCampaigns.push(id);
        
        this.push();
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

    onLogInSuccess() {
        
    }



    logIn(usernameAttempt, password) {
        console.log('Log In called');

        return dao.logIn(usernameAttempt, password)
            .then(userInfo => {
                this.set(({username, email, isLoggedIn, message}) => {
                    message = 'You have been logged in successfully.';
                    username = userInfo.username;
                    email = userInfo.email;

                    isLoggedIn = true;
                });
            })
            .catch(({response}) => this.set(({isLoggedIn, message}) => {
                let status;
                if(
                    typeof response === 'object' &&
                    response.hasOwnProperty('status')
                ) {
                    status = response.status
                };

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


    // Asyncronously update Sparrow API with altered campaigns
    push() {
        if(this.timeoutIsSet) return;

        this.timeoutIsSet = true;

        setTimeout(function() {
            console.log('Pushing');
            
            this.timeoutIsSet = false;
            
            const campaigns = this.getAlteredCampaigns();
            Promise.all(campaigns.map(campaign => 
                dao.put(campaign))
            );
        }.bind(this), cooldown);
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

                // Makes state accessable from the context object
                ...this.state,

                post: (name, url) => this.post(name, url),
                update: (campaignId, k, v) => this.update(campaignId, k, v),
                toggle: (campaignId, prop) => this.toggle(campaignId, prop),
                remove: (campaignId) => this.remove(campaignId),

                logIn: (user, pass) => this.logIn(user, pass),
                logOut: () => this.logOut(),
                register: (user, email, pass) => this.register(user, email, pass),
                
                redirect: (url) => this.redirect(url),
                
                setMessage: (message) => this.setMessage(message)
            }}>
                {this.renderRedirect()}
                {this.props.children}
            </Context.Provider>
        );
    }
}



// {
//     id: 2,
//     name: 'Jer\'s Campaign',
//     url: 'https://www.example.com',
//     isEnabled: true,
//     effect: 'fadeIn',
//     location: 2,
//     leadCount: 2151,
//     message: 'Hello!'
// }