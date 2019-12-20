import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
//import { checkAuthentication } from './helpers';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWrench, faChartLine, faClipboardList, faLink, faEnvelope, faTimes, faHome, faTools } from '@fortawesome/free-solid-svg-icons'
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
      <Nav defaultActiveKey="/" className="d-flex flex-row flex-md-column sidebar">
        <Nav.Link className="nav-link-light" href="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</Nav.Link>
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/platform"><FontAwesomeIcon icon={faPlus} fixedWidth /> Platform</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/pipeline"><FontAwesomeIcon icon={faWrench} fixedWidth /> Pipeline</Nav.Link>}
        {/* {this.state.authenticated && <Nav.Link className="nav-link-light" eventKey="link-2"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</Nav.Link>} */}
        
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> Connectors</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/update"><FontAwesomeIcon icon={faEnvelope} fixedWidth /> Updates</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/reports"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" disabled href="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> Admin Tools</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" disabled href="/removal"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Nav.Link>}
      </Nav>
    );
  }
});
