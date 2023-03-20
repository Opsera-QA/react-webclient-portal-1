import React, {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {SITE_VIEW_MODES} from "components/header/view_modes/siteViewMode.constants";
import { THEMES } from "temp-library-components/theme/theme.constants";
import { lightThemeConstants } from "temp-library-components/theme/light.theme.constants";
import { darkThemeConstants } from "temp-library-components/theme/dark.theme.constants";
import ClientWebsocket from "core/websocket/client.websocket";
import { DATE_FN_TIME_SCALES, handleDateAdditionForTimeScale } from "components/common/helpers/date/date.helpers";
import MainViewContainer from "components/common/containers/MainViewContainer";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import {platformSettingsActions} from "components/admin/platform_settings/platformSettings.actions";
import useAxiosCancelToken from "hooks/useAxiosCancelToken";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import organizationActions from "components/settings/organizations/organization-actions";

const websocketClient = new ClientWebsocket();

const AuthContextProvider = (
  {
    userData,
    refreshToken,
    authClient,
    children,
    isAuthenticated,
  }) => {
  const history = useHistory();
  const [userAccessRoles, setUserAccessRoles] = useState(undefined);
  const [viewMode, setViewMode] = useState(SITE_VIEW_MODES.BUSINESS);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [backgroundColor, setBackgroundColor] = useState(lightThemeConstants.COLOR_PALETTE.WHITE);
  const [headerNavigationBar, setHeaderNavigationBar] = useState(undefined);
  const [platformSettingsRecord, setPlatformSettingsRecord] = useState(undefined);
  const [organizationSettingsRecord, setOrganizationSettingsRecord] = useState(undefined);
  const { cancelTokenSource } = useAxiosCancelToken();

  useEffect(() => {
    setUserAccessRoles(undefined);
    setPlatformSettingsRecord(undefined);
    setOrganizationSettingsRecord(undefined);

    if (userData) {
      // websocketClient?.initializeWebsocket(userData);
      initializeUserData();
    }
    // else {
    //   websocketClient?.closeWebsocket();
    // }
  }, [userData]);

  const initializeUserData = () => {
    const newAccessRoles = SiteRoleHelper.getAccessRoles(userData);

    if (newAccessRoles) {
      setUserAccessRoles({...newAccessRoles});
    }

    platformSettingsActions.getActivePlatformSettings(
      getAccessToken,
      cancelTokenSource,
    ).then((response) => {
      const platformSettings = DataParsingHelper.parseNestedObject(response, "data.data");

      if (platformSettings) {
        setPlatformSettingsRecord({...platformSettings});
      }
    }).catch(() => console.error("Could not pull platform settings record"));

    organizationActions.getOrganizationSettings(
      getAccessToken,
      cancelTokenSource,
    ).then((response) => {
      const organizationSettings = DataParsingHelper.parseNestedObject(response, "data.data");

      if (organizationSettings) {
        setOrganizationSettingsRecord({...organizationSettings});
      }
    }).catch(() => console.error("Could not pull organization settings record"));
  };

  const logoutUserContext = async () => {
    authClient.tokenManager.clear();
    await authClient.revokeAccessToken();
    await authClient.revokeRefreshToken();
    authClient.closeSession()
      .then(() => {
        //window.location.replace("/");
        history.push("/");
      })
      .catch(e => {
        if (e.xhr && e.xhr.status === 429) {
          // Too many requests
        }
      });
  };

  const loginUserContext = () => {
    history.push("/login");
  };

  const renewUserToken = () => {
    refreshToken();
  };

  const getAccessToken = async () => {
    const isAuthenticated = await getIsAuthenticated();

    if (!isAuthenticated) {
      //console.log("!getAccessToken: refreshing UI to trigger login");
      //window.location = "/login"; //if not authenticated, may just need to take user to login page
      //window.location.reload(false);
      return false;
    }

    const tokenObject = await authClient.tokenManager.get("accessToken");

    if (tokenObject.accessToken) {
      let now = moment();
      let tokenExp = moment.unix(tokenObject.expiresAt);

      if (now.isBefore(tokenExp)) { //maybe check if 30min has passed and then force refresh?  Be proactive?
        console.info("TOKEN NOT EXPIRED: ", tokenExp.format("MMMM Do YYYY, h:mm:ss a"));
        //console.log("Existing token: ", tokenObject.accessToken);
        return tokenObject.accessToken;
      } else {
        console.info("EXPIRED TOKEN FOUND ON:", tokenExp.format("MMMM Do YYYY, h:mm:ss a"));
        const newToken = await authClient.tokenManager.renew("accessToken");
        console.info("REFRESHED TOKEN FOR:", moment.unix(newToken.expiresAt).format("MMMM Do YYYY, h:mm:ss a"));
        //console.log("token being returned from getAccessToken:", newToken.accessToken);
        return newToken.accessToken;
      }

    } else {
      console.info("no access token available");
      return false;
    }
  };

  const getIsAuthenticated = async () => {
    const idToken = await authClient.tokenManager.get("idToken");
    const accessToken = await authClient.tokenManager.get("accessToken");
    return !!(idToken && accessToken);
  };

  const getUserRecord = async () => {
    return userData;
  };

  const getFreeTrialUserExpirationDate = () => {
    if (!userData) {
      return null;
    }

    const userCreatedAt = userData?.createdAt;
    return handleDateAdditionForTimeScale(userCreatedAt, DATE_FN_TIME_SCALES.DAYS, 15);
  };

  const featureFlagHideItemInProd = () => {
    return String(process.env.REACT_APP_ENVIRONMENT) !== "development" && String(process.env.REACT_APP_ENVIRONMENT) !== "test";
  };

  const featureFlagHideItemInTest = () => {
    return String(process.env.REACT_APP_ENVIRONMENT) === "test";
  };

  // TODO: Remove and just use the helper function
  const setAccessRoles = async (user) => {
    return SiteRoleHelper.getAccessRoles(user);
  };

  const getAccessRoleData = () => {
    return userAccessRoles;
  };

  const subscribeToTopic = (topic, model) => {
    websocketClient?.subscribeToTopic(topic, model);
  };

  const unsubscribeFromTopic = (topic, model) => {
    websocketClient?.unsubscribeFromTopic(topic, model);
  };

  // TODO: Don't return as function, just return true/false when pulling from auth context
  const isSassUser = () => {
    if (userData == null) {
      return false;
    }

    const ldap = userData?.ldap;
    const groups = userData?.groups;
    return ldap?.type === "sass-user" || (Array.isArray(groups) && groups?.includes("NonLDAPEndUser"));
  };

  const isPowerUser = () => {
    return userAccessRoles?.PowerUser === true;
  };

  const isSiteAdministrator = () => {
    return userAccessRoles?.Administrator === true;
  };

  // TODO: Don't return as function, just return true/false when pulling from auth context
  const isOpseraAdministrator = () => {
    if (userData == null) {
      return false;
    }

    const ldap = userData?.ldap;
    const groups = userData?.groups;
    return ldap?.domain === "opsera.io" && Array.isArray(groups) && groups?.includes("Administrators");
  };

  const getThemeConstants = () => {
    switch (theme) {
      case THEMES.LIGHT:
        return lightThemeConstants;
      case THEMES.NIGHT:
        return darkThemeConstants;
      default:
        return lightThemeConstants;
    }
  };

  return (
    <AuthContext.Provider value={{
      logoutUserContext: logoutUserContext,
      loginUserContext: loginUserContext,
      renewUserToken: renewUserToken,
      getAccessToken: getAccessToken,
      featureFlagHideItemInProd: featureFlagHideItemInProd,
      featureFlagHideItemInTest: featureFlagHideItemInTest,
      getUserRecord: getUserRecord,
      setAccessRoles: setAccessRoles,
      getIsAuthenticated: getIsAuthenticated,
      getAccessRoleData: getAccessRoleData,
      userAccessRoles: userAccessRoles,
      isPowerUser: isPowerUser(),
      isSiteAdministrator: isSiteAdministrator(),
      isSassUser: isSassUser,
      isOpseraAdministrator: isOpseraAdministrator,
      viewMode: viewMode,
      setViewMode: setViewMode,
      theme: theme,
      setTheme: setTheme,
      themeConstants: getThemeConstants(),
      // getWebsocketClient: getWebSocketClient,
      websocketClient: websocketClient,
      subscribeToTopic: subscribeToTopic,
      unsubscribeFromTopic: unsubscribeFromTopic,
      userData: userData,
      userExpiration: getFreeTrialUserExpirationDate(),
      headerNavigationBar: headerNavigationBar,
      setHeaderNavigationBar: setHeaderNavigationBar,
      backgroundColor: backgroundColor,
      setBackgroundColor: setBackgroundColor,
      platformSettingsRecord: platformSettingsRecord,
      organizationSettingsRecord: organizationSettingsRecord,
    }}>
      <MainViewContainer
        isAuthenticated={isAuthenticated}
        backgroundColor={backgroundColor}
        userData={userData}
      >
        {children}
      </MainViewContainer>
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  userData: PropTypes.object,
  refreshToken: PropTypes.func,
  authClient: PropTypes.object,
  children: PropTypes.any,
  isAuthenticated: PropTypes.bool,
};

export const AuthContext = createContext();
export default AuthContextProvider;
