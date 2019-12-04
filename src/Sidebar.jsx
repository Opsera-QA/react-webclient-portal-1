import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
//import { checkAuthentication } from './helpers';
import { Nav } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHome, faSignOutAlt } from '@fo rtawesome/free-solid-svg-icons'
import './sidebar.css';

export default withAuth(class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }
  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column sidebar">
        <div className="nav-link-header">Products</div>
        {this.state.authenticated && <Nav.Link href="/home">New Platform</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-1">CI/CD Pipeline</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2">Analytics</Nav.Link>}
        
        <div className="nav-link-header" style={{marginTop:15}}>Operations</div>
        {this.state.authenticated && <Nav.Link href="/home">Inventory</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-1">API Connectors</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2">Upgrades</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2">Reporting</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2">Delete Tools</Nav.Link>}
      </Nav>
    );
  }
});
