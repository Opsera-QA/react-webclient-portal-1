
import React, { Component } from 'react';
import {AuthContext} from './contexts/AuthContext';
import { withRouter } from "react-router";
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWrench, faChartLine, faClipboardList, faLink, faEnvelope, faDownload, faHome, faTools } from '@fortawesome/free-solid-svg-icons'
import './sidebar.css';


class Sidebar extends Component {
  static contextType = AuthContext;

  render() {
    const { location } = this.props;
    const { authenticated, } = this.context;
    return (
      <Nav defaultActiveKey="/" activeKey={location.pathname} className="d-flex flex-row flex-md-column sidebar">
        <Nav.Link className="nav-link-light" href="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</Nav.Link>
        {/* { authenticated && <Nav.Link className="nav-link-light" href="/platform"><FontAwesomeIcon icon={faPlus} fixedWidth /> Platform</Nav.Link>} */}
        { authenticated && <Nav.Link className="nav-link-light" href="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory</Nav.Link>}
        { authenticated && <Nav.Link className="nav-link-light" href="/pipeline"><FontAwesomeIcon icon={faWrench} fixedWidth /> Pipeline</Nav.Link>}
        { authenticated && <Nav.Link className="nav-link-light" href="/reports"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</Nav.Link>}
    
        { authenticated && <Nav.Link className="nav-link-light" href="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> Connectors</Nav.Link>}
        { authenticated && <Nav.Link className="nav-link-light" href="/update"><FontAwesomeIcon icon={faDownload} fixedWidth /> Updates</Nav.Link>}
        
        { authenticated && <Nav.Link className="nav-link-light + (this.active ? 'nav-link-active' : '')" href="/admin"><FontAwesomeIcon icon={faTools} fixedWidth /> Admin Tools</Nav.Link>}
        {/* { authenticated && <Nav.Link className="nav-link-light" disabled href="/removal"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Nav.Link>} */}
      </Nav>
    );
  }
};

export default withRouter(Sidebar);
