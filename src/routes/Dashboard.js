import React from 'react';
import Layout from '../Layout';

const campaigns = [
    {
        name: 'RTO',
        url: 'www.google.com',
        leads: 501,
    },
    {
        name: 'HOPE',
        url: 'www.example.com',
        leads: 6593,
    },
    {
        name: 'Google',
        url: 'www.wiki.org',
        leads: 4,
    },
];

export default class Dashboard extends React.Component {
    render() {
        return (
            <Layout>
                <div class='dashboard container'>
                    <div class='head'>
                        <form class='dash-form'>
                            <div class='form-row'>
                                <div class="col-md-4">
                                    <input type="email" class="form-control" id="inputEmail4" placeholder="Campaign Name" />
                                </div>
                                <div class="col-md-6">
                                    <input type="email" class="form-control" id="inputEmail4" placeholder="Site URL" />
                                </div>
                                <div class="col-md-1">
                                    <input class='submit-img' type="image" name="submit" src="https://image.flaticon.com/icons/svg/148/148764.svg" border="0" alt="Submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class='card-container'>
                        {campaigns.map(camp => {
                            return (
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{camp.name}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{camp.url}</h6>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <input type='image' class="settings-link" src='https://image.flaticon.com/icons/svg/70/70367.svg'/>
                                        <input type='image' class="leads-link" src='https://image.flaticon.com/icons/svg/74/74472.svg'/>
                                        <input type='image' class="settings-link" src='https://image.flaticon.com/icons/svg/126/126468.svg'/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Layout>
        ); 
    }
}