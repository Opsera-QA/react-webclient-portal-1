import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import sessionHelper from "utils/session.helper";
import userActions from "components/user/user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { AuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import SiteViewModeNavigationSelectInput from "components/header/view_modes/SiteViewModeNavigationSelectInput";
import OpseraHeaderSettingsLink from "components/header/OpseraHeaderSettingsLink";

const EXTERNAL_LINKS = {
  KNOWLEDGE_BASE: `https://opsera.atlassian.net/l/c/pXJjJAej`
};

export default function OpseraHeaderAccountAuthenticationComponent(
  {
    hideAuthComponents,
  }) {
  const {
    loginUserContext,
    logoutUserContext,
  } = useContext(AuthContext);
  const {
    toastContext,
    accessRoleData,
    getAccessToken,
    userData,
    themeConstants,
    isTestEnvironment,
    isProductionEnvironment,
  } = useComponentStateReference();
  // const fullUserName = `${userData?.firstName} ${userData?.lastName} (${userData?.email})`;
  const fullUserName = `${userData?.firstName} ${userData?.lastName}`;

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

  const getUserIconTitle = () => {
    return (
      <IconBase
        icon={faUserCircle}
        iconSize={"lg"}
        iconStyling={{
          backgroundColor: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
          // borderRadius: "38px",
          color: themeConstants.COLOR_PALETTE.WHITE,
        }}
      />
    );
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

  const getTitle = () => {
    return (
      <span>
        {getUserIconTitle()}
        <span className={"mx-2"}>{fullUserName}</span>
      </span>
    );
  };

  const getUserIconDropdown = () => {
    return (
      <NavDropdown
        title={getTitle()}
        id={"basic-nav-dropdown"}
        className={"top-nav-dropdown"}
      >
        <Link
          to={"/user/profile"}
          id={"profile-button"}
          className={"dropdown-item nav-drop-down-item"}
        >
          Profile
        </Link>
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

  if (hideAuthComponents === true) {
    return null;
  }

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
        {/*{getViewTypeDropdown()}*/}
        <OpseraHeaderSettingsLink />
      </Nav>
    </Navbar.Collapse>
  );
}

OpseraHeaderAccountAuthenticationComponent.propTypes = {
  hideAuthComponents: PropTypes.bool,
};
