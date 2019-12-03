import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Container from 'react-bootstrap/Container'
import config from './config';
import Home from './Home';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Messages from './components/user/Messages';
import Profile from './components/user/Profile';
import About from './components/about/About';
import Pricing from './components/about/Pricing';
import Solutions from './components/about/Solutions';


// THIS CLIENT WILL AUTHENTICATE WITH OKTA AND THEN NEEDS TO PASS TOKEN TO SERVICES (THAT"S PART 2)
// TODO: config.js has hardcoded Okta values for now

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config.oidc}>
          <Navbar />          
          <div className="container-fluid row mt-4">
            <div className="col-xl-2 col-md-3 col-12 bg-dark">
              <Sidebar /> 
            </div>
            <div className="col-xl-8 col-md-9 col-12">
              <Container text>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/about/pricing" component={Pricing} />
                <Route path="/about/solutions" component={Solutions} />
                <Route path="/implicit/callback" component={ImplicitCallback} />
                <SecureRoute path="/messages" component={Messages} />
                <SecureRoute path="/profile" component={Profile} />
              </Container>
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;