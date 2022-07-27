import React, {createContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {useHistory} from "react-router-dom";
import commonActions from "components/common/common.actions";
import axios from "axios";
import accountsActions from "components/admin/accounts/accounts-actions";
import {SITE_VIEW_MODES} from "components/header/view_modes/siteViewMode.constants";
import { THEMES } from "temp-library-components/theme/theme.constants";
import { lightThemeConstants } from "temp-library-components/theme/light.theme.constants";
import { darkThemeConstants } from "temp-library-components/theme/dark.theme.constants";
import { PUBLIC_PATHS } from "AppWithRouterAccess";

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.REACT_APP_OPSERA_NODE_JWT_SECRET;

const AuthContextProvider = ({ userData, refreshToken, authClient, children }) => {
  const history = useHistory();
  const [userAccessRoles, setUserAccessRoles] = useState(undefined);
  const [viewMode, setViewMode] = useState(SITE_VIEW_MODES.BUSINESS);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  // const [websocketClient, setWebsocketClient] = useState(new ClientWebsocket());
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;

      // if (websocketClient) {
      //   websocketClient.close();
      // }
    };
  }, []);

  // TODO: We should probably combine with the above
  useEffect(() => {
    setUserAccessRoles(undefined);

    if (userData) {
      setAccessRoles(userData).then((newUserAccessRoles) => {
        setUserAccessRoles(newUserAccessRoles);
      }).catch((error) => {
        if (isMounted?.current === true) {
          console.error("Could not set User access roles: " + JSON.stringify(error));
          setUserAccessRoles({});
          throw error;
        }
      });
    }
  }, [userData]);

  // const getWebsocketClient = () => {
  //   return websocketClient;
  // };

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
    //window.location = "/login";
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

  const getIsPreviewRole = async (restrictProd) => {
    if (restrictProd && process.env.REACT_APP_ENVIRONMENT === "production") {
      return false;
    } else {
      return userData.groups.includes("Preview");
    }
  };

  const getFeatureFlags = async () => {
    const response = await commonActions.getFeatureFlagsV2(getAccessToken, cancelTokenSource);
    return response?.data?.featureFlags;
  };

  const isOrganizationOwner = async () => {
    const user = await getUserRecord();

    if (user) {
      const response = await accountsActions.getOrganizationOwnerEmailWithNameV2(getAccessToken, cancelTokenSource, user?.ldap?.organization);
      const organizationOwnerEmail = response?.data?.orgOwnerEmail;
      return organizationOwnerEmail === user?.email;
    }
  };

  const featureFlagHideItemInProd = () => {
    return String(process.env.REACT_APP_ENVIRONMENT) !== "development" && String(process.env.REACT_APP_ENVIRONMENT) !== "test";
  };

  const featureFlagHideItemInTest = () => {
    return String(process.env.REACT_APP_ENVIRONMENT) === "test";
  };

  const setAccessRoles = async (user) => {
    if (user) {
      let customerAccessRules = {};
      const ldap = user?.ldap;
      const groups = user?.groups;

      if (Array.isArray(groups)) {
        let role = "guest";

        if (groups.includes("Administrators")) {
          role = "administrator";
        } else if (groups.includes("Free Trial")) {
          role = "free_trial";
        } else if (groups.includes("PowerUsers")) {
          role = "power_user";
        } else if (groups.includes("Users")) {
          role = "user";
        } else if (groups.includes("NonLDAPEndUser") || ldap.type === "sass-user") {
          //setting Saas Based Access
          role = "power_user";
        }

        customerAccessRules = {
          ...customerAccessRules,
          OrganizationOwner: ldap?.organizationOwnerEmail === user?.email,
          OrganizationAccountOwner: ldap?.orgAccountOwnerEmail === user?.email,
          Administrator: groups.includes("Administrators"),
          PowerUser: groups.includes("PowerUsers"),
          SassPowerUser: ldap.type === "sass-user",
          FreeTrialUser: role === "free_trial",
          User: groups.includes("Users"),
          UserId: user._id,
          Email: user.email,
          Role: role,
          Type: ldap ? ldap.type : "sass-user",
          Groups: groups,
        };

        if (ldap?.domain === "opsera.io") { //checking for OpsERA account domain
          customerAccessRules.OpseraAdministrator = groups.includes("Administrators");
        }
      }

      //console.table(customerAccessRules);
      return customerAccessRules;
    }
  };

  const generateJwtServiceTokenWithValue = (object = {}, expirationDuration = "1h") => {
    return jwt.sign(
      object,
      ACCESS_TOKEN_SECRET,
      {expiresIn: expirationDuration},
      undefined,
    );
  };

  const getAccessRoleData = () => {
    return userAccessRoles;
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

  const getScreenBackgroundColor = () => {
    const themeConstants = getThemeConstants();
    switch (history.location.pathname) {
      case PUBLIC_PATHS.FREE_TRIAL_REGISTRATION:
        return themeConstants.COLOR_PALETTE.BACKGROUND_PURPLE;
      default:
        return themeConstants.COLOR_PALETTE.BACKGROUND_GRAY;
    }
  };

  return (
    <AuthContext.Provider value={{
      logoutUserContext: logoutUserContext,
      loginUserContext: loginUserContext,
      renewUserToken: renewUserToken,
      getAccessToken: getAccessToken,
      getIsPreviewRole: getIsPreviewRole,
      featureFlagHideItemInProd: featureFlagHideItemInProd,
      featureFlagHideItemInTest: featureFlagHideItemInTest,
      getUserRecord: getUserRecord,
      setAccessRoles: setAccessRoles,
      getIsAuthenticated: getIsAuthenticated,
      generateJwtServiceTokenWithValue: generateJwtServiceTokenWithValue,
      getAccessRoleData: getAccessRoleData,
      userAccessRoles: userAccessRoles,
      isPowerUser: isPowerUser(),
      isSiteAdministrator: isSiteAdministrator(),
      isSassUser: isSassUser,
      isOrganizationOwner: isOrganizationOwner,
      getFeatureFlags: getFeatureFlags,
      isOpseraAdministrator: isOpseraAdministrator,
      viewMode: viewMode,
      setViewMode: setViewMode,
      theme: theme,
      setTheme: setTheme,
      themeConstants: getThemeConstants(),
      // getWebsocketClient: getWebSocketClient,
    }}>
      <div
        style={{
          backgroundColor: getScreenBackgroundColor(),
        }}
      >
      </div>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  userData: PropTypes.object,
  refreshToken: PropTypes.func,
  authClient: PropTypes.object,
  children: PropTypes.any,
};

export const AuthContext = createContext();
export default AuthContextProvider;
