import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import sessionHelper from "utils/session.helper";
import userActions from "components/user/user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteViewModeNavigationSelectInput from "components/header/view_modes/SiteViewModeNavigationSelectInput";

function HeaderNavigationBar({ hideAuthComponents, userData }) {
  const {
    loginUserContext,
    logoutUserContext,
  } = useContext(AuthContext);
  const { toastContext, isLdapUser, accessRoleData, getAccessToken, } = useComponentStateReference();
  const history = useHistory();
  const [currentScreen, setCurrentScreen] = useState("pipelines");

  const login = function() {
    loginUserContext();
  };

  const logout = async function() {
    //call logout API to clear cache
    try {
      sessionHelper.clearOutSessionStorage();
      await userActions.logout(getAccessToken);
      logoutUserContext();
    } catch (error) {
      toastContext.showErrorDialog(error.message);
    }
  };

  const gotoSignUp = function() {
    if (process.env.REACT_APP_STACK === "free-trial") {
      history.push("/trial/registration");
    } else {
      history.push("/signup");
    }
  };

  // TODO: Should this be passed in?
  const getSubNavigationBar = () => {
    return (
      <Navbar.Collapse id={"basic-navbar-nav"}>
        <Nav.Item className={"mx-5"}>
          <div
            className={currentScreen === "pipelines" ? "font-weight-bold my-auto" : ""}
          >
            Pipelines
          </div>
          <div className={currentScreen === "pipelines" ? "w-100 mt-auto active-header-underline" : ""} />
        </Nav.Item>
        <Nav.Item className={"mx-5"}>
          <div
            className={currentScreen === "insights" ? "font-weight-bold active-header-underline" : ""}
          >
            Unified Insights
          </div>
          <div className={currentScreen === "insights" ? "w-100 mt-auto active-header-underline" : ""} />
        </Nav.Item>
      </Navbar.Collapse>
    );
  };

  // TODO: There might be multiple versions of this depending on how we build it--
  //  different areas might have different views. If we only use one version, move this inline
  const getViewTypeDropdown = () => {
    if (hideAuthComponents === false && accessRoleData) {
      return (
        <div className={"mr-5"}>
          <SiteViewModeNavigationSelectInput />
        </div>
      );
    }
  };

  const getUserIconDropdown = () => {
    
  };


  const getAuthenticationComponents = () => {
    if (hideAuthComponents !== true) {
      if (!accessRoleData) {
        return (
          <Navbar.Collapse id={"basic-navbar-nav"}>
            <Nav className={"ml-auto"}>
              <Button
                variant={"warning"}
                className="mr-2"
                onClick={gotoSignUp}
              >
                Sign Up
              </Button>
              <Button
                variant={"outline-success"}
                onClick={login}
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        );
      }

      return (
        <Navbar.Collapse id={"basic-navbar-nav"}>
          <Nav className={"ml-auto"}>
            {getViewTypeDropdown()}
          </Nav>
        </Navbar.Collapse>
      );
    }
  };

  return (
    <Navbar className="nav-bar">
      <Navbar.Brand href="/">
        <img
          alt={"Opsera Inc."}
          src={"/img/logos/opsera-logo-temp.png"}
          width={"148"}
          height={"78"}
          className={"d-inline-block align-top mx-3"}
        />
      </Navbar.Brand>
      {getSubNavigationBar()}
      {getAuthenticationComponents()}
    </Navbar>
  );
}

HeaderNavigationBar.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object,
};

export default HeaderNavigationBar;
