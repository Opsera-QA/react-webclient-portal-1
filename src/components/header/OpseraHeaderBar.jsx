import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown, Button, OverlayTrigger } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import sessionHelper from "utils/session.helper";
import userActions from "components/user/user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteViewModeNavigationSelectInput from "components/header/view_modes/SiteViewModeNavigationSelectInput";
import IconBase from "components/common/icons/IconBase";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import FreeTrialLandingHeaderNavigationBar from "components/header/FreeTrialLandingHeaderNavigationBar";

const EXTERNAL_LINKS = {
  KNOWLEDGE_BASE: `https://opsera.atlassian.net/l/c/pXJjJAej`
};

export default function OpseraHeaderBar({ hideAuthComponents, userData }) {
  const {
    loginUserContext,
    logoutUserContext,
  } = useContext(AuthContext);
  const {
    toastContext,
    isLdapUser,
    accessRoleData,
    getAccessToken,
    themeConstants,
    isOpseraAdministrator,
    isTestEnvironment,
    isProductionEnvironment,
  } = useComponentStateReference();
  const history = useHistory();
  const [currentScreen, setCurrentScreen] = useState("home");

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
      <FreeTrialLandingHeaderNavigationBar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
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

  const getFrequentlyAskedQuestionsLink = () => {
    return (
      <Link to={"/faq"} id={"faq-button"} className={"dropdown-item nav-drop-down-item"}>
        Frequently Asked Questions
      </Link>
    );
  };

  const getHelpDocumentationLink = () => {
    if (isProductionEnvironment === false && isTestEnvironment === false) {
      return (
        <Link to={"/help-documentation"} id={"help-button"} className={"dropdown-item nav-drop-down-item"}>
          Help Documentation
        </Link>
      );
    }
  };

  const getUserIconDropdown = () => {
    return (
      <NavDropdown
        title={getUserIconTitle()}
        id={"basic-nav-dropdown"}
        className={"top-nav-dropdown"}
      >
        <Link to="/user/profile" id="profile-button" className="dropdown-item nav-drop-down-item">Profile</Link>
        {/*{isLdapUser && <Link to="/user/myUserRecord" id="profile-button" className="dropdown-item nav-drop-down-item">User Settings</Link>}*/}

        <NavDropdown.Divider/>

        <NavDropdown.Item href={EXTERNAL_LINKS.KNOWLEDGE_BASE} target="_blank"
                          className="nav-drop-down-item" id="kb-button">KnowledgeBase</NavDropdown.Item>
        <NavDropdown.Item href="https://opsera.atlassian.net/wiki/x/AQBYAw" target="_blank"
                          className="nav-drop-down-item" id="request-help-button">Request Help</NavDropdown.Item>
        {getFrequentlyAskedQuestionsLink()}
        {getHelpDocumentationLink()}
        <NavDropdown.Divider/>

        <NavDropdown.Item href="https://opsera.io/" target="_blank" className="nav-drop-down-item"
                          id="about-opsera">Opsera.io</NavDropdown.Item>
        <NavDropdown.Item href="" onClick={logout} className="nav-drop-down-item"
                          id="logout-button">Logout</NavDropdown.Item>
      </NavDropdown>
    );
  };

  const getUserIconTitle = () => {
    return (
      <IconBase
        icon={faUserCircle}
        iconSize={"lg"}
        // iconStyling={{
        //   backgroundColor: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
        //   // borderRadius: "38px",
        //   color: themeConstants.COLOR_PALETTE.WHITE,
        // }}
      />
    );
  };

  const getSettingsLink = () => {
    if (isOpseraAdministrator === true) {
      return (
        <Navbar.Collapse id={"basic-navbar-nav"}>
          <span className={"mr-3"}>
            <Link to={"/settings"}>
              Settings
            </Link>
          </span>
        </Navbar.Collapse>
      );
    }
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
            {getUserIconDropdown()}
            {getViewTypeDropdown()}
            {getSettingsLink()}
          </Nav>
        </Navbar.Collapse>
      );
    }
  };

  return (
    <Navbar>
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

OpseraHeaderBar.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object,
};
