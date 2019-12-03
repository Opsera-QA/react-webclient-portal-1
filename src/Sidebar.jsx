import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
//import Styles from './sidebar.css';
import { Nav } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHome, faSignOutAlt } from '@fo rtawesome/free-solid-svg-icons'

export default withAuth(class Sidebar extends Component {
    render() {
        return (        
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav>
   );
  }
});
