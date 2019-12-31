import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import {AuthContext} from './contexts/AuthContext';
import './navbar.css';

class Navigation extends Component {
  static contextType = AuthContext;

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  async login() {
    const { loginUserContext } = this.context;
    loginUserContext();
  }

  async logout() {
    const { logoutUserContext } = this.context;
    logoutUserContext();
  }

  gotoSignUp = () => {
    let path = `/signup`;
    this.props.history.push(path);
  }

  render() {
    const { authenticated, userInfo } = this.context;
    return (
      <Navbar bg="dark" variant="dark" className="nav-bar">
        <Navbar.Brand href="/" style={{minWidth:165}}>
          <img alt="OpsERA"
            src="/img/opsera_logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
          /><span className="header-text">psERA</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/about/solutions" className="d-none d-sm-inline">Solutions</Nav.Link>
            <Nav.Link href="/about/pricing" className="d-none d-sm-inline">Pricing</Nav.Link>
            <Nav.Link href="/about" className="d-none d-sm-inline">Contact Us</Nav.Link> */}
          </Nav>
          { !authenticated && <Button variant="success" className="mr-2" onClick={this.gotoSignUp}>Sign Up</Button>}
          { !authenticated && <Button variant="outline-success" onClick={this.login}>Login</Button>}
          { authenticated && <Nav>
            <NavDropdown title={userInfo ? userInfo.name : 'Unknown User Name'} id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="/messages" id="messages-button">Messages</NavDropdown.Item>
              <NavDropdown.Item href="/profile" id="profile-button">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" id="slack-channel-button">#SlackChannel</NavDropdown.Item>
              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/kIA5" target="_blank" id="kb-button">KnowledgeBase</NavDropdown.Item>
              <NavDropdown.Item href="/" id="request-help-button">Request Help</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">About OpsERA</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={this.logout} id="logout-button">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>}

        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default Navigation;
