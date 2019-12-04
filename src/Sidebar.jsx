import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
//import { checkAuthentication } from './helpers';
//import Styles from './sidebar.css';
import { Nav } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHome, faSignOutAlt } from '@fo rtawesome/free-solid-svg-icons'

export default withAuth(class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

    render() {
        return (        
          <Nav defaultActiveKey="/home" className="flex-column sidebar">
            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled: {this.state.authenticated}
            </Nav.Link>
          </Nav>
   );
  }
});
