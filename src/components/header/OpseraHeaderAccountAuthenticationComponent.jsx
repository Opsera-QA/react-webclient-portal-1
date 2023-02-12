import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import sessionHelper from "utils/session.helper";
import userActions from "components/user/user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { AuthContext } from "contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import SiteViewModeNavigationSelectInput from "components/header/view_modes/SiteViewModeNavigationSelectInput";
import OpseraHeaderSettingsLink from "components/header/OpseraHeaderSettingsLink";
import {EXTERNAL_LINKS} from "components/header/legacy/HeaderNavBar";

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
  } = useComponentStateReference();
  // const fullUserName = `${userData?.firstName} ${userData?.lastName} (${userData?.email})`;
  const fullUserName = `${userData?.firstName} ${userData?.lastName}`;
  const history = useHistory();
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
    history.push("/trial/registration");
  };

  const getUserIconTitle = () => {
    return (
      <IconBase
        icon={faUserCircle}
        iconSize={"lg"}
        iconStyling={{
          // borderRadius: "38px",
          color: themeConstants.COLOR_PALETTE.WHITE,
        }}
      />
    );
  };

  const getTitle = () => {
    return (
      <span
        style={{
          color: `${themeConstants.COLOR_PALETTE.WHITE}`,
        }}
      >
        {getUserIconTitle()}
        <span className={"d-none d-lg-inline ml-2 mr-1"}>{fullUserName}</span>
      </span>
    );
  };

  const getUserIconDropdown = () => {
    return (
      <NavDropdown alignRight
        title={getTitle()}
        id={"basic-nav-dropdown"}
        className={"top-nav-dropdown"}
      >
        <NavDropdown.Item href={EXTERNAL_LINKS.FREE_TRIAL_KNOWLEDGE_BASE} target="_blank"
                          className="nav-drop-down-item" id="kb-button">KnowledgeBase</NavDropdown.Item>
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

  if (!userData) {
    return null;
    // return (
    //   <Navbar.Collapse id={"basic-navbar-nav"}>
    //     <Nav className={"ml-auto"}>
    //       <Button
    //         variant={"warning"}
    //         className="mr-2"
    //         onClick={gotoSignUp}
    //       >
    //         Sign Up
    //       </Button>
    //       <Button
    //         variant={"outline-success"}
    //         onClick={login}
    //       >
    //         Login
    //       </Button>
    //     </Nav>
    //   </Navbar.Collapse>
    // );
  }

  return (
    <Navbar.Collapse id={"basic-navbar-nav"}>
      <Nav className={"ml-auto"}>
        {/*{getViewTypeDropdown()}*/}
        <OpseraHeaderSettingsLink />
        {getUserIconDropdown()}
      </Nav>
    </Navbar.Collapse>
  );
}

OpseraHeaderAccountAuthenticationComponent.propTypes = {
  hideAuthComponents: PropTypes.bool,
};
