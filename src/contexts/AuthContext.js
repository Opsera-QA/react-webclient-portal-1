import React, {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {SITE_VIEW_MODES} from "components/header/view_modes/siteViewMode.constants";
import { THEMES } from "temp-library-components/theme/theme.constants";
import { lightThemeConstants } from "temp-library-components/theme/light.theme.constants";
import ClientWebsocket from "core/websocket/client.websocket";
import { DATE_FN_TIME_SCALES, handleDateAdditionForTimeScale } from "components/common/helpers/date/date.helpers";
import MainViewContainer from "components/common/containers/MainViewContainer";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import {platformSettingsActions} from "components/admin/platform_settings/platformSettings.actions";
import useAxiosCancelToken from "hooks/useAxiosCancelToken";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import organizationActions from "components/settings/organizations/organization-actions";
import commonActions from "components/common/common.actions";
import useAuthenticationToken from "hooks/general/api/useAuthenticationToken";

const websocketClient = new ClientWebsocket();

// TODO: Move
export const getFreeTrialUserExpirationDate = (userData) => {
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

const AuthContextProvider = (
  {
    userData,
    children,
  }) => {
  const history = useHistory();
  const [viewMode, setViewMode] = useState(SITE_VIEW_MODES.BUSINESS);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [backgroundColor, setBackgroundColor] = useState(lightThemeConstants.COLOR_PALETTE.WHITE);
  const [platformSettingsRecord, setPlatformSettingsRecord] = useState(undefined);
  const [organizationSettingsRecord, setOrganizationSettingsRecord] = useState(undefined);
  const [featureFlags, setFeatureFlags] = useState(undefined);
  const { cancelTokenSource } = useAxiosCancelToken();
  const {
    authClient,
    getAccessToken,
    getIsAuthenticated,
  } = useAuthenticationToken();
  const userAccessRoles = SiteRoleHelper.getAccessRoles(userData);

  useEffect(() => {
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

    commonActions.getFeatureFlagsV2(
      getAccessToken,
      cancelTokenSource,
    ).then((response) => {
      const flags = DataParsingHelper.parseNestedObject(response, "data", {});
      setFeatureFlags({...flags});
    }).catch(() => console.error("Could not pull flags"));
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

  return (
    <AuthContext.Provider value={{
      logoutUserContext: logoutUserContext,
      loginUserContext: loginUserContext,
      getAccessToken: getAccessToken,
      featureFlagHideItemInProd: featureFlagHideItemInProd,
      featureFlagHideItemInTest: featureFlagHideItemInTest,
      getIsAuthenticated: getIsAuthenticated,
      viewMode: viewMode,
      setViewMode: setViewMode,
      theme: theme,
      setTheme: setTheme,
      websocketClient: websocketClient,
      userData: userData,
      userExpiration: getFreeTrialUserExpirationDate(),
      backgroundColor: backgroundColor,
      setBackgroundColor: setBackgroundColor,
      platformSettingsRecord: platformSettingsRecord,
      organizationSettingsRecord: organizationSettingsRecord,
      featureFlags: featureFlags,

      userAccessRoles: userAccessRoles,
      isPowerUser: userAccessRoles?.PowerUser === true,
      isSiteAdministrator: userAccessRoles?.Administrator === true,
      isOpseraAdministrator:() => userAccessRoles?.OpseraAdministrator === true,
      getUserRecord: () => userData,
    }}>
      <MainViewContainer
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
  children: PropTypes.any,
};

export const AuthContext = createContext();
export default AuthContextProvider;
