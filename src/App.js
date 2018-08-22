import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Leads from './pages/Leads';
import Login from './pages/Login';
import Root from './pages/Root';
import Layout from './components/Layout';
import AuthenticatedRoute from './components/AuthenticatedRoute';

import Provider from './components/Provider';

class App extends Component {
	render() {
		return (
			<Provider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Root}/>
						<AuthenticatedRoute
							exact
							path='/dashboard'
							component={Dashboard}/>
						<Route exact path="/register" component={Register}/>
						<Route exact path="/login" component={Login}/>
						<AuthenticatedRoute
							path="/leads"
							render={(props) => <Leads {...props}/>}
							component={Leads}
						/>
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
