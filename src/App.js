import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard';
import Register from './routes/Register';
import Login from './routes/Login';

import Provider from './components/Provider';

class App extends Component {
	render() {
		return (
			<Provider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Dashboard}/>
						<Route exact path="/register" component={Register}/>
						<Route exact path="/login" component={Login}/>
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
