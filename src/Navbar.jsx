import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown, Button, OverlayTrigger } from "react-bootstrap";
import "./navbar.css";
import userActions from "./components/user/user-actions";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";

import { renderTooltip } from "utils/helpers";

// TODO: Move to suitable spot
export const getAccessRolePermissionMessage = (accessRole) => {
  switch (accessRole?.Role) {
    case "administrator":
      return "Administrator User Role: Your account has full access to the Opsera platform and its settings.";
    case "power_user":
      return "Power User Role: Your account has elevated privileges to to the Opsera platform.";
    case "user":
      return "Standard User Role: Your account has standard user access to the Opsera platform and inherits access based on individual item access roles.";
    case "readonly":
      return "Read Only Role: Your account does not have any privileges associated with the Opsera platform and can only view some data.";
  }
}

function HeaderNavBar({ hideAuthComponents, userData }) {
  const { setAccessRoles, getAccessToken, featureFlagHideItemInProd, loginUserContext, logoutUserContext } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [fullName, setFullName] = useState("User Profile");
  const [accessRoleData, setAccessRoleData] = useState(null);
  const [isLdapUser, setIsLdapUser] = useState(undefined);

  useEffect(() => {
    getRoles(userData);
  }, [userData]);

  const getRoles = async (user) => {
    if (user) {
      const userRoleAccess = await setAccessRoles(user);
      if (userRoleAccess) {
        setAccessRoleData(userRoleAccess);
        const isLdapUser = userRoleAccess?.Type !== "sass-user" && user?.ldap?.domain != null;
        setIsLdapUser(isLdapUser);
      }
      setFullName(user.firstName + " " + user.lastName);
    } else {
      setFullName("User Profile");
    }
  };

  const login = function() {
    loginUserContext();
  };

  const logout = async function() {
    //call logout API to clear cache
    try {
      await userActions.logout(getAccessToken);
      logoutUserContext();
    } catch (error) {
      toastContext.showErrorDialog(error.message);
    }
  };

  const getPermissionsMessage = () => {
    let permissionsMessage, permissionHeader;

    switch (accessRoleData?.Role) {
    case "administrator":
      permissionHeader = "Administrator Access";
      permissionsMessage = "Administrator User Role: Your account has full access to the Opsera platform and its settings.";
      break;
    case "power_user":
      permissionHeader = "Power User Access";
      permissionsMessage = "Power User Role: Your account has elevated privileges to to the Opsera platform.";
      break;
    case "user":
      permissionHeader = "Standard User Access";
      permissionsMessage = "Standard User Role: Your account has standard user access to the Opsera platform and inherits access based on individual item access roles.";
      break;
    case "readonly":
      permissionHeader = "Read Only Access";
      permissionsMessage = "Read Only Role: Your account does not have any privileges associated with the Opsera platform and can only view some data.";
      break;
    }

    return (
      <div className="mt-2 py-1 opsera-banner-text-on-purple-background">
        <OverlayTrigger
          placement="auto"
          delay={{ hide: 400 }}
          overlay={renderTooltip({ message: permissionsMessage })}>
          <FontAwesomeIcon icon={faUserCircle} fixedWidth style={{ fontSize:"larger" }}/>
        </OverlayTrigger>
      </div>
    );
  };

  const gotoSignUp = function() {
    if (process.env.REACT_APP_STACK === "free-trial") {
      history.push("/trial/registration");
    } else {
      history.push("/signup");
    }
  };

  if (process.env.REACT_APP_STACK === "free-trial") {
    return (
      <Navbar className="nav-bar">
        <Navbar.Brand href="/">
          <img alt="Opsera Inc."
               src="/img/logos/opsera_logo_white_horizontal_240_42.png"
               width="240"
               height="42"
               className="d-inline-block align-top ml-3"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          {!hideAuthComponents && <Nav className="ml-auto">
            {!accessRoleData && <Button variant="warning" className="mr-2" onClick={gotoSignUp}>Sign Up</Button>}
            {!accessRoleData && <Button variant="outline-success" onClick={login}>Login</Button>}
            {accessRoleData &&
            <NavDropdown title={fullName} id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/kIA5" target="_blank"
                                className="nav-drop-down-item" id="kb-button">KnowledgeBase</NavDropdown.Item>
              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/AQBYAw" target="_blank"
                                className="nav-drop-down-item" id="request-help-button">Request Help</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="https://opsera.io/" target="_blank" className="nav-drop-down-item"
                                id="about-opsera">OpsERA.io</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={logout} className="nav-drop-down-item"
                                id="logout-button">Logout</NavDropdown.Item>
            </NavDropdown>}
          </Nav>}

        </Navbar.Collapse>
      </Navbar>
    );
  }

  return (
    <Navbar className="nav-bar">
      <Navbar.Brand href="/">
        <img alt="Opsera Inc."
             src="/img/logos/opsera_logo_white_horizontal_240_42.png"
             width="240"
             height="42"
             className="d-inline-block align-top ml-3"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        {!hideAuthComponents && <Nav className="ml-auto">
          {!accessRoleData && <Button variant="warning" className="mr-2" onClick={gotoSignUp}>Sign Up</Button>}
          {!accessRoleData && <Button variant="outline-success" onClick={login}>Login</Button>}
          {accessRoleData && <>

            {getPermissionsMessage()}

            <NavDropdown title={fullName} id="basic-nav-dropdown" className="top-nav-dropdown" alignRight>
              <Link to="/user/profile" id="profile-button" className="dropdown-item nav-drop-down-item">Profile</Link>
              {isLdapUser && <Link to="/user/myUserRecord" id="profile-button" className="dropdown-item nav-drop-down-item">User Settings</Link>}

              <NavDropdown.Divider/>

              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/kIA5" target="_blank"
                                className="nav-drop-down-item" id="kb-button">KnowledgeBase</NavDropdown.Item>
              <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/AQBYAw" target="_blank"
                                className="nav-drop-down-item" id="request-help-button">Request Help</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href="https://opsera.io/" target="_blank" className="nav-drop-down-item"
                                id="about-opsera">OpsERA.io</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={logout} className="nav-drop-down-item"
                                id="logout-button">Logout</NavDropdown.Item>
            </NavDropdown>

          </>}
        </Nav>}

      </Navbar.Collapse>
    </Navbar>
  );
}

HeaderNavBar.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object,
};

export default HeaderNavBar;
