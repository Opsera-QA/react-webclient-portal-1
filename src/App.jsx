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


// THIS CLIENT WILL AUTHENTICATE WITH OKTA AND THEN NEEDS TO PASS TOKEN TO SERVICES (THAT"S PART 2)
// TODO: config.js has hardcoded Okta values for now

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Security {...config.oidc}>
            <Navbar />          
            <div className="container-fluid" style={{ padding: 0}}>
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
                  <SecureRoute path="/api_connector" component={ApiConnector} />
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