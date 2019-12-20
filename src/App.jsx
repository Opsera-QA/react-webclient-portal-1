import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Container from 'react-bootstrap/Container'
import { Provider } from "react-redux";
import store from "./store";
import config from './config';
import Home from './Home';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Messages from './components/user/Messages';
import Profile from './components/user/Profile';
import About from './components/about/About';
import Pricing from './components/about/Pricing';
import Solutions from './components/about/Solutions';
import Inventory from './components/inventory/Inventory';
import Signup from './components/user/Signup';
import ApiConnector from './components/api_connector/ApiConnector';
import Pipeline from './components/pipeline/Pipeline'
import Platform from './components/platform/Platform';
import Reports from './components/reports/Reports';
import Update from './components/update/Update';

import AdminTools from './components/admin/AdminTools';
import HealthCheck from './components/admin/HealthCheck';
import DeleteTools from './components/admin/DeleteTools';
import RegisteredUsers from './components/admin/RegisteredUsers';
import ManageSystems from './components/admin/ManageSystems';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Security {...config.oidc}>
            <Navbar />          
            <div className="container-fluid">
            <div className="flex-xl-nowrap row sidebar">
              <div className="col-xl-2 col-md-3 col-12 d-flex flex-column bg-dark pt-4">
                <Sidebar /> 
              </div>
              <div className="col-xl-8 col-md-9 col-12 pt-4">
                <Container text>
                  <Route path="/" exact component={Home} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/about" exact component={About} />
                  <Route path="/about/pricing" component={Pricing} />
                  <Route path="/about/solutions" component={Solutions} />
                  <Route path="/implicit/callback" component={ImplicitCallback} />
                  <SecureRoute path="/messages" component={Messages} />
                  <SecureRoute path="/profile" component={Profile} />
                  <SecureRoute path="/inventory" component={Inventory} />
                  <SecureRoute path="/api_connector/:id?" component={ApiConnector} />
                  <SecureRoute path="/pipeline" component={Pipeline} />
                  <SecureRoute path="/platform" component={Platform} />
                  <SecureRoute path="/reports" component={Reports} />
                  <SecureRoute path="/update" component={Update} />

                  <SecureRoute path="/admin" exact component={AdminTools} />
                  <SecureRoute path="/admin/health" component={HealthCheck} />
                  <SecureRoute path="/admin/delete" component={DeleteTools} />
                  <SecureRoute path="/admin/manage_systems" component={ManageSystems} />
                  <SecureRoute path="/admin/registered_users" component={RegisteredUsers} />
                </Container>
              </div>
            </div>
            </div>
          </Security>
        </Router>
      </Provider>
    );
  }
}

export default App;