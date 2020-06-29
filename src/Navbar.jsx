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
    { authenticated: false, administrator: false, userRecord: null }
  );

  useEffect(() => {
    getUser();
  }, [contextType]); 


  const getUser = async () => {
    const { authenticated, getUserRecord } = contextType;
    const userInfo = await getUserRecord();
    setState({ authenticated: authenticated });
    if (userInfo) {
      setState({ userName: userInfo.firstName + " " + userInfo.lastName });
    }
  };

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
    <Navbar className="nav-bar">
      <Navbar.Brand href="/" style={{ minWidth:165 }}>
        <img alt="OpsERA"
          src="/img/opsera_logo_170x35.png"
          width="170"
          height="35"
          className="d-inline-block align-top ml-3"
        />
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
            <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/kIA5" target="_blank" className="nav-drop-down-item" id="kb-button">KnowledgeBase</NavDropdown.Item>
            <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/AQBYAw" target="_blank" className="nav-drop-down-item" id="request-help-button">Request Help</NavDropdown.Item>
            <NavDropdown.Divider />
            {/* <Link to="/about" id="profile-button" className="dropdown-item nav-drop-down-item">About OpsERA</Link> */}
            <NavDropdown.Item href="https://opsera.io/" target="_blank" className="nav-drop-down-item" id="about-opsera">About OpsERA</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={logout} className="nav-drop-down-item" id="logout-button">Logout</NavDropdown.Item>
          </NavDropdown>}
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderNavBar;
