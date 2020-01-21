import React, { useContext, useReducer, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { AuthContext } from "./contexts/AuthContext";
import "./navbar.css";


function HeaderNavBar() {
  const contextType = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { authenticated: false, administrator: false, userName: null }
  );

  useEffect(() => {
    const { authenticated, userInfo } = contextType;
    setState({ authenticated: authenticated });
    if (userInfo) {
      setState({ userName: userInfo.name });
    }

  }, [contextType]); 

  const login = function() {
    const { loginUserContext } = contextType;
    loginUserContext();
  };

  const logout = function() {
    const { logoutUserContext } = contextType;
    logoutUserContext();
  };

  const gotoSignUp = function () {
    history.push("/signup");
  };

  return (
    <Navbar bg="dark" variant="dark" className="nav-bar">
      <Navbar.Brand href="/" style={{ minWidth:165 }}>
        <img alt="OpsERA"
          src="/img/opsera_logo.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
        /><span className="header-text">psERA</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { !state.authenticated && <Button variant="success" className="mr-2" onClick={gotoSignUp}>Sign Up</Button>}
          { !state.authenticated && <Button variant="outline-success" onClick={login}>Login</Button>}
          { state.authenticated && 
          <NavDropdown title={state.userName ? state.userName : "Unknown User Name"} id="basic-nav-dropdown" alignRight>
            {/* <NavDropdown.Item><Link to="/messages" id="messages-button" className="nav-drop-down-item">Messages</Link></NavDropdown.Item> */}
            <Link to="/profile" id="profile-button" className="dropdown-item nav-drop-down-item">Profile</Link>
            <NavDropdown.Divider />
            {/* <NavDropdown.Item href="/" id="slack-channel-button">#SlackChannel</NavDropdown.Item> */}
            <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/kIA5" target="_blank" id="kb-button">KnowledgeBase</NavDropdown.Item>
            <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/AQBYAw" target="_blank" id="request-help-button">Request Help</NavDropdown.Item>
            <NavDropdown.Divider />
            <Link to="/about" id="profile-button" className="dropdown-item nav-drop-down-item">About OpsERA</Link>
            <NavDropdown.Item href="" onClick={logout} id="logout-button">Logout</NavDropdown.Item>
          </NavDropdown>}
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderNavBar;
