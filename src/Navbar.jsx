import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { AuthContext } from "./contexts/AuthContext";
import "./navbar.css";


function HeaderNavBar({ hideAuthComponents, userData }) {
  const contextType = useContext(AuthContext);
  const { authState, setAccessRoles } = contextType;
  const history = useHistory();
  const [fullName, setFullName] = useState("User Profile");
  const [accessRoleData, setAccessRoleData] = useState({});
  
  useEffect(() => {    
    getRoles(userData);
  }, [userData]);

  const getRoles = async (user) => {
    if (user) {
      const userRoleAccess = await setAccessRoles(user);
      if (userRoleAccess) {
        setAccessRoleData(userRoleAccess);
      }
      setFullName(user.firstName + " " + user.lastName);
    } else {
      setFullName("User Profile");
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
        {!hideAuthComponents && <Nav className="ml-auto">
          { !authState.isAuthenticated && <Button variant="success" className="mr-2" onClick={gotoSignUp}>Sign Up</Button>}
          { !authState.isAuthenticated && <Button variant="outline-success" onClick={login}>Login</Button>}
          { authState.isAuthenticated && 
          <NavDropdown title={fullName} id="basic-nav-dropdown" alignRight>
            <Link to="/profile" id="profile-button" className="dropdown-item nav-drop-down-item">Profile</Link>
            <NavDropdown.Divider />

              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/kIA5" target="_blank" className="nav-drop-down-item" id="kb-button">KnowledgeBase</NavDropdown.Item>
              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/AQBYAw" target="_blank" className="nav-drop-down-item" id="request-help-button">Request Help</NavDropdown.Item>
              <NavDropdown.Divider />

            <NavDropdown.Item href="https://opsera.io/" target="_blank" className="nav-drop-down-item" id="about-opsera">OpsERA.io</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={logout} className="nav-drop-down-item" id="logout-button">Logout</NavDropdown.Item>
          </NavDropdown>}
        </Nav> }

      </Navbar.Collapse>
    </Navbar>
  );
}

HeaderNavBar.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object
};

export default HeaderNavBar;
