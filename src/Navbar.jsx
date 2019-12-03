import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons' 
import { checkAuthentication } from './helpers';
import './navbar.css';

export default withAuth(class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" className="nav-bar">
        <Navbar.Brand href="/">
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
            <Nav.Link href="/about/solutions">Solutions</Nav.Link>
            <Nav.Link href="/about/pricing">Pricing</Nav.Link>
            <Nav.Link href="/about">Contact Us</Nav.Link>
          </Nav>
          {this.state.authenticated === false && <Button variant="success" className="mr-2">Sign Up</Button>}
          {this.state.authenticated === false && <Button variant="outline-success" onClick={this.login}>Login</Button>}
          {this.state.authenticated === true && <Nav>
            <NavDropdown title={this.state.userinfo.name} id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="/messages" id="messages-button">Messages</NavDropdown.Item>
              <NavDropdown.Item href="/profile" id="profile-button">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" id="profile-button">#Slack Channel</NavDropdown.Item>
              <NavDropdown.Item href="/" id="profile-button">Knowledgebase</NavDropdown.Item>
              <NavDropdown.Item href="/" id="profile-button">Request Help</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">About Us</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={this.logout} id="logout-button">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>}

        </Navbar.Collapse>
      </Navbar>
    );
  }
});
