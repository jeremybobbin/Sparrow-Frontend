import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Leads from './pages/Leads';
import Login from './pages/Login';
import Root from './pages/Root';
import Layout from './components/Layout';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import dao from './utils/Dao';


class App extends Component {

	constructor(props) {
		super();
		this.state = {
			message: '',
			redirect: false,
			redirectPath: '',
			isLoggedIn: false,
			username: null,
		};
		if(!this.state.isLoggedIn) this.logIn();
	}

	set(callback) {
		return new Promise(resolve =>
			this.setState(callback(this.state), (newState) => resolve(newState)));
	}

	setMessage(message) {
		return this.set(s => {
			s.message = message;
			return s;
		});
	}

	componentWillMount() {
		this.set(s => {
			s.redirect = false;
			s.redirectPath = '';
			return s;
		});
	}

	loadCampaigns() {
		return dao.getCampaigns();
	}

	redirect(path) {
		this.set(s => {
			s.redirect = true;
			s.redirectPath = path;
			return s;
		});
	}

	renderRedirect() {
		if(this.state.redirect) {
			return <Redirect to={this.state.redirectPath}/>
		}
	}

	logIn(username, password) {
		dao.logIn(username, password)
			.then(newUsername => this.set(s => {
				s.isLoggedIn = true;
				console.log(newUsername);
				if(username) s.message = 'You have been logged in successfully.';
				s.username = newUsername;
				return s;
			}))
			.catch(e => this.set(s => {
				console.log(e);
				s.isLoggedIn = false;
				s.message = 'There was an issue connecdong to the server.';
				return s; 
			}));
	}

	logOut() {
		dao.logOut()
			.then(() => this.set(s => {
				s.isLoggedIn = false;
				s.message = 'You have been successfully logged out.';
				s.username = null;
				return s;
			}))
			.catch();
	}

	register(username, email, password) {
		dao.register(username, email, password)
			.then(() => this.set(s => {
				s.message = 'You have been registered successfully.';
				s.isLoggedIn = true;
				s.username = username;
				return s;
			}))
			.catch(e => this.set(s => {
				s.message = e;
				return s;
			}));
	}

	render() {
		return (
			<BrowserRouter>
				<Layout 
					message={this.state.message}
					username={this.state.username}
				>
					{this.renderRedirect()}
					<Route 
						exact path="/" 
						component={Root}
					/>
					<AuthenticatedRoute
						exact path='/dashboard'
						isLoggedIn={!this.state.isLoggedIn}
						component={() => 
							<Dashboard
								redirect={(path) => this.redirect(path)}
								loadCampaigns={() => this.loadCampaigns()}
							/>}
					/>
					<Route
						exact path="/register"
						component={Register}
					/>
					<Route
						exact path="/login"
						component={() => 
							<Login
								logIn={this.logIn}
								isLoggedIn={this.isLoggedIn}
								submitHandler={(u, p)=> this.logIn(u,p)}
							/>}
					/>
					<AuthenticatedRoute
						path="/leads"
						render={(props) => <Leads {...props}/>}
						component={Leads}
					/>
				</Layout>
			</BrowserRouter>
		);
	}
}

export default App;
