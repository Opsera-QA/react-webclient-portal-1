import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
//import { checkAuthentication } from './helpers';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWrench, faChartLine, faClipboardList, faLink, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons'
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
      <Nav defaultActiveKey="/home" className="d-flex flex-row flex-md-column sidebar">
        {this.state.authenticated && <div className="nav-link-header">Products</div>}
        {this.state.authenticated && <Nav.Link href="/home"><FontAwesomeIcon icon={faPlus} fixedWidth /> New Platform</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faWrench} fixedWidth /> CI/CD Pipeline</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</Nav.Link>}
        
        {this.state.authenticated && <div className="nav-link-header" style={{marginTop:15}}>Operations</div>}
        {this.state.authenticated && <Nav.Link href="/home"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faLink} fixedWidth /> API Connectors</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2"><FontAwesomeIcon icon={faEnvelope} fixedWidth /> Upgrades</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Reporting</Nav.Link>}
        {this.state.authenticated && <Nav.Link eventKey="link-2"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Nav.Link>}

        {!this.state.authenticated && <Nav.Link href="/about">Customers</Nav.Link>}      
        {!this.state.authenticated && <Nav.Link href="/about/solutions">Solutions</Nav.Link>}
        {!this.state.authenticated && <Nav.Link href="/about/pricing">Services</Nav.Link>}
        {!this.state.authenticated && <Nav.Link href="/about">Company</Nav.Link>}
        {!this.state.authenticated && <Nav.Link href="/about">Contact Us</Nav.Link>}
      </Nav>
    );
  }
});
