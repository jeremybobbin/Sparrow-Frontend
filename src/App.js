import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard';
import Register from './routes/Register';
import Leads from './routes/Leads';
import Login from './routes/Login';
import Root from './routes/Root';
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
						/>
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
