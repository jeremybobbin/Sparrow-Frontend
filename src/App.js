import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import  { Provider } from './components/Context';

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Leads from './pages/Leads';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Root from './pages/Root';
import Layout from './components/Layout';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import dao from './utils/Dao';


class App extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<BrowserRouter>
				<Provider>
					<Layout 
					>
						<Route 
							exact path="/" 
							component={Root}
						/>
						<AuthenticatedRoute
							exact path='/dashboard'
							component={() => <Dashboard/>}
						/>
						<Route
							exact path="/register"
							component={Register}
						/>
						<Route
							exact path="/login"
							component={() => <Login/>}
						/>
						<AuthenticatedRoute
							path="/leads"
							render={(props) => <Leads {...props}/>}
							component={Leads}
						/>
						<Route
							exact path="/logout"
							component={() => 
								<Logout 
									logOut={() => this.logOut()} 
								/>}
						/>
					</Layout>
				</Provider>
			</BrowserRouter>
		);
	}
}

export default App;
