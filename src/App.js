import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard';
import Register from './routes/Register';
import Login from './routes/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
