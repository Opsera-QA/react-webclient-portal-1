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
import useLocationReference from "hooks/useLocationReference";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";
import {hasStringValue} from "components/common/helpers/string-helpers";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {getAccessRolePermissionMessage} from "components/common/helpers/role-helpers";

export default function OpseraHeaderAccountAuthenticationComponent(
  {
    hideAuthComponents,
  }) {
  const { isPublicPathState } = useLocationReference();
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
    isFreeTrial,
    isSaasUser,
    isProductionEnvironment,
    isTestEnvironment,
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
    if (userData) {
      return (
        <div className={"my-auto"}>
          <OverlayIconBase
            icon={faUserCircle}
            iconSize={"lg"}
            iconStyling={{
              // borderRadius: "38px",
              color: themeConstants.COLOR_PALETTE.WHITE,
            }}
            overlayBody={isFreeTrial === false ? getAccessRolePermissionMessage(accessRoleData) : undefined}
            overlayPlacement={"bottom"}
          />
        </div>
      );
    }
  };

  const getTitle = () => {
    return (
      <span
        style={{
          color: `${themeConstants.COLOR_PALETTE.WHITE}`,
        }}
      >
        <span className={"d-none d-lg-inline mr-1"}>{fullUserName}</span>
      </span>
    );
  };

  const getUserDetails = () => {
    const accountNameText = isSaasUser === true || hasStringValue(userData?.ldap?.accountName) !== true ? "" : `at ${userData?.ldap?.accountName} `;

    if (userData) {
      return (
        <div>
          <div className={"italic py-1 px-4"}>
            {`${userData?.email} ${accountNameText}as ${SiteRoleHelper.getFormattedSiteRoleLevel(userData)}`}
          </div>
          <NavDropdown.Divider/>
        </div>
      );
    }
  };

  const getFrequentlyAskedQuestionsLink = () => {
    return (
      <Link
        to={"/faq"}
        id={"faq-button"}
        className={"dropdown-item nav-drop-down-item"}
      >
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
    if (isPublicPathState === true || hideAuthComponents === true) {
      return null;
    }

    if (!userData) {
      if (isFreeTrial === true) {
        return null;
      }

      return (
        <Navbar.Collapse id={"basic-navbar-nav"}>
          <Nav className={"ml-auto"}>
            <Button
              variant={"warning"}
              className={"mr-2"}
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

    if (isFreeTrial === true) {
      return (
        <NavDropdown
          alignRight
          title={getTitle()}
          id={"basic-nav-dropdown"}
          className={"top-nav-dropdown"}
        >
          <NavDropdown.Item
            href={EXTERNAL_LINKS.FREE_TRIAL_KNOWLEDGE_BASE}
            target={"_blank"}
            className={"nav-drop-down-item"}
            id={"kb-button"}
          >
            KnowledgeBase
          </NavDropdown.Item>
          <NavDropdown.Divider/>
          <NavDropdown.Item
            href={"https://opsera.io/"}
            target={"_blank"}
            className={"nav-drop-down-item"}
            id={"about-opsera"}
          >
            Opsera.io
          </NavDropdown.Item>
          <NavDropdown.Item
            href={""}
            onClick={logout}
            className={"nav-drop-down-item"}
            id={"logout-button"}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      );
    }

    return (
      <NavDropdown
        title={getTitle()}
        id={"basic-nav-dropdown"}
        className={"top-nav-dropdown"}
        alignRight
      >
        <div className={"authentication-dropdown"}>
          {getUserDetails()}
          <NavDropdown.Item
            as={Link}
            to={`/user/${USER_SETTINGS_PAGES.MY_USER_PROFILE}`}
            id={"profile-button"}
            className={"dropdown-item nav-drop-down-item"}
          >
            Profile
          </NavDropdown.Item>

          {/*{isSaasUser === false && <Link to="/user/myUserRecord" id="profile-button" className="dropdown-item nav-drop-down-item">User Settings</Link>}*/}

          <NavDropdown.Divider/>

          <NavDropdown.Item
            active={false}
            href={EXTERNAL_LINKS.KNOWLEDGE_BASE}
            target={"_blank"}
            className={"nav-drop-down-item"}
            id={"kb-button"}
          >
            KnowledgeBase
          </NavDropdown.Item>
          <NavDropdown.Item
            active={false}
            href={EXTERNAL_LINKS.REQUEST_HELP_LINK}
            target={"_blank"}
            className={"nav-drop-down-item"}
            id={"request-help-button"}
          >
            Request Help
          </NavDropdown.Item>
          {getFrequentlyAskedQuestionsLink()}
          {getHelpDocumentationLink()}
          <NavDropdown.Divider/>

          <NavDropdown.Item
            href={"https://opsera.io/"}
            target={"_blank"}
            className={"nav-drop-down-item"}
            id={"about-opsera"}
            active={false}
          >
            Opsera.io
          </NavDropdown.Item>
          <NavDropdown.Item
            href={""}
            onClick={logout}
            className={"nav-drop-down-item"}
            id={"logout-button"}
          >
            Logout
          </NavDropdown.Item>
        </div>
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

  return (
    <Navbar id={"basic-navbar-nav"}>
      <Nav>
        {/*{getViewTypeDropdown()}*/}
        <OpseraHeaderSettingsLink />
        <div className={"d-flex ml-2"}>
          {getUserIconTitle()}
          {getUserIconDropdown()}
        </div>
      </Nav>
    </Navbar>
  );
}

OpseraHeaderAccountAuthenticationComponent.propTypes = {
  hideAuthComponents: PropTypes.bool,
};
