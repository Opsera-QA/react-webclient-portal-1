import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import {getAccessRolePermissionMessage} from "components/common/helpers/role-helpers";
import sessionHelper from "utils/session.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLocationReference from "hooks/useLocationReference";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";
import OpseraHeaderIcon from "components/header/OpseraHeaderIcon";
import userActions from "components/user/user-actions";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

export const EXTERNAL_LINKS = {
  FREE_TRIAL_KNOWLEDGE_BASE: `https://docs.opsera.io/getting-started-with-free-trial`,
  FREE_TRIAL_REQUEST_HELP: "https://opsera.atlassian.net/servicedesk/customer/portal/2/group/10/create/32",
  KNOWLEDGE_BASE: `https://docs.opsera.io/`,
  REQUEST_HELP_LINK: `https://opsera.atlassian.net/wiki/x/AQBYAw`,
  SUPPORT_EMAIL: "mailto:support@opsera.io",
  OPSERA_SALESFORCE_PIPELINES: "https://www.opsera.io/platform/salesforce-pipelines",
  REGISTER_GIT_REPOSITORY: "https://youtu.be/-kDG-550j-U",
  SALESFORCE_PIPELINE_WORKFLOW_CREATION: "https://youtu.be/9otE3Z4LuTM",
  SALESFORCE_TASK_CREATION: "https://youtu.be/_nYnj8JVs7g",
  SALESFORCE_RELEASE_MANAGEMENT: "https://www.opsera.io/salesforce-devops-platform",
  SALESFORCE_USER_GUIDE: "https://docs.opsera.io/getting-started-with-free-trial",
  HOW_TO_VIDEO: 'https://www.youtube.com/embed/8oeBwmapAHU'
};

// TODO: Combine with the Free Trial one
function HeaderNavBar({ hideAuthComponents }) {
  const { isPublicPathState } = useLocationReference();
  const { featureFlagHideItemInProd, featureFlagHideItemInTest, loginUserContext, logoutUserContext } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [fullName, setFullName] = useState("User Profile");
  const {
    accessRoleData,
    isSaasUser,
    userData,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    const user = DataParsingHelper.parseObject(userData);

    if (user) {
      setFullName(user.firstName + " " + user.lastName);
    }
  }, [userData]);

  const login = function() {
    loginUserContext();
  };

  const logout = async function() {
    //call logout API to clear cache
    try {
      sessionHelper.clearOutSessionStorage();
      await userActions.logout(getAccessToken);
      await userActions.revokeAuthToken(getAccessToken);
      logoutUserContext();
    } catch (error) {
      toastContext.showErrorDialog(error.message);
    }
  };

  const getPermissionsMessage = () => {
    return (
      <div className={"my-auto opsera-banner-text-on-purple-background"}>
        <OverlayIconBase
          icon={faUserCircle}
          iconSize={"lg"}
          overlayBody={getAccessRolePermissionMessage(accessRoleData)}
          overlayPlacement={"bottom"}
        />
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

  const getHelpDocumentationLink = () => {
    if (featureFlagHideItemInProd() === false && featureFlagHideItemInTest() === false) {
      return (
        <Link to={"/help-documentation"} id={"help-button"} className={"dropdown-item nav-drop-down-item"}>
          Help Documentation
        </Link>
      );
    }
  };

  return (
    <Navbar className={"nav-bar py-2 px-3"}>
      <Navbar.Brand href="/">
        <OpseraHeaderIcon />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        {!hideAuthComponents && isPublicPathState !== true && <Nav className="ml-auto">
          {!accessRoleData && <Button variant="warning" className="mr-2" onClick={gotoSignUp}>Sign Up</Button>}
          {!accessRoleData && <Button variant="outline-success" onClick={login}>Login</Button>}
          {accessRoleData && <>

            {getPermissionsMessage()}

            <NavDropdown title={fullName} id="basic-nav-dropdown" className="top-nav-dropdown" alignRight>
              <div className={"authentication-dropdown"}>
              {getUserDetails()}
              <NavDropdown.Item
                  as={Link}
                  to={`/user/${USER_SETTINGS_PAGES.MY_USER_PROFILE}`}
                  id="profile-button"
                  className="dropdown-item nav-drop-down-item"
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
