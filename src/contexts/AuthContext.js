import React, {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {SITE_VIEW_MODES} from "components/header/view_modes/siteViewMode.constants";
import { THEMES } from "temp-library-components/theme/theme.constants";
import { lightThemeConstants } from "temp-library-components/theme/light.theme.constants";
import { DATE_FN_TIME_SCALES, handleDateAdditionForTimeScale } from "components/common/helpers/date/date.helpers";
import MainViewContainer from "components/common/containers/MainViewContainer";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import useAuthenticationToken from "hooks/general/api/useAuthenticationToken";
import useGetActivePlatformSettingsRecord from "hooks/platform/useGetActivePlatformSettingsRecord";
import useGetOrganizationSettingsRecord from "hooks/settings/organization_settings/useGetOrganizationSettingsRecord";
import useGetConfigurationFeatureFlags from "hooks/platform/feature_flags/useGetConfigurationFeatureFlags";
import useGetAnalyticsProfileStatus from "hooks/insights/profile/useGetAnalyticsProfileStatus";

import ClientWebsocket from "core/websocket/client.websocket";
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
    loadUserData,
    setExpectedEmailAddress,
    children,
  }) => {
  const history = useHistory();
  const [viewMode, setViewMode] = useState(SITE_VIEW_MODES.BUSINESS);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [backgroundColor, setBackgroundColor] = useState(lightThemeConstants.COLOR_PALETTE.WHITE);
  const {
    authClient,
    getAccessToken,
    getIsAuthenticated,
  } = useAuthenticationToken();
  const getActivePlatformSettingsRecordHook = useGetActivePlatformSettingsRecord(userData);
  const getOrganizationSettingsRecordHook = useGetOrganizationSettingsRecord(userData);
  const {
    featureFlags,
  } = useGetConfigurationFeatureFlags(userData);
  const {
    areAnalyticsToolsEnabled,
  } = useGetAnalyticsProfileStatus(userData);

  const userAccessRoles = SiteRoleHelper.getAccessRoles(userData);

  useEffect(() => {
    if (userData) {
      websocketClient?.initializeWebsocket(userData);
    } else {
      websocketClient?.closeWebsocket();
    }
  }, [userData]);

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
      backgroundColor: backgroundColor,
      setBackgroundColor: setBackgroundColor,
      platformSettingsRecord: getActivePlatformSettingsRecordHook.platformSettingsRecord,
      isLoadingPlatformSettingsRecord: getActivePlatformSettingsRecordHook.isLoading,
      organizationSettingsRecord: getOrganizationSettingsRecordHook.organizationSettingsRecord,
      isLoadingOrganizationSettingsRecord: getOrganizationSettingsRecordHook.isLoading,
      featureFlags: featureFlags,
      loadUserData: loadUserData,
      areAnalyticsToolsEnabled: areAnalyticsToolsEnabled,
      setExpectedEmailAddress: setExpectedEmailAddress,

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
  loadUserData: PropTypes.func,
  setExpectedEmailAddress: PropTypes.func,
  children: PropTypes.any,
};

export const AuthContext = createContext(AuthContextProvider);
export default AuthContextProvider;
