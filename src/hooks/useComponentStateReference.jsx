import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import useIsMountedStateReference from "hooks/useIsMountedStateReference";
import useAxiosCancelToken from "hooks/useAxiosCancelToken";
import useAccessRoleData from "hooks/roles/useAccessRoleData";
import useTheme from "hooks/theme/useTheme";
import useAuthenticationToken from "hooks/general/api/useAuthenticationToken";

const isProductionEnvironment = String(process.env.REACT_APP_ENVIRONMENT) !== "development" && String(process.env.REACT_APP_ENVIRONMENT) !== "test";
const isTestEnvironment = String(process.env.REACT_APP_ENVIRONMENT) === "test";

export default function useComponentStateReference() {
  const isMounted = useIsMountedStateReference();
  const {
    cancelTokenSource,
    getNewCancelToken,
  } = useAxiosCancelToken();
  const {
    getAccessToken,
    isAuthenticated,
  } = useAuthenticationToken();
  const {
    userData,
    backgroundColor,
    loadUserData,
  } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const {
    isSiteAdministrator,
    isSaasUser,
    isOpseraAdministrator,
    isPowerUser,
    accessRoleData,
    isSecurityManager,
    isAuditor,
    domain,
  } = useAccessRoleData();
  const {
    themeConstants,
  } = useTheme();

  useEffect(() => {}, []);

  return ({
    isMounted: isMounted,
    cancelTokenSource: cancelTokenSource,
    getNewCancelToken: getNewCancelToken,
    getAccessToken: getAccessToken,
    toastContext: toastContext,
    accessRoleData: accessRoleData,
    themeConstants: themeConstants,
    isOpseraAdministrator: isOpseraAdministrator,
    isSiteAdministrator: isSiteAdministrator,
    isSecurityManager: isSecurityManager,
    isAuditor: isAuditor,
    isProductionEnvironment: isProductionEnvironment,
    isTestEnvironment: isTestEnvironment,
    isSaasUser: isSaasUser,
    userData: userData,
    loadUserData: loadUserData,
    isFreeTrial: false,
    backgroundColor: backgroundColor,
    isAuthenticated: isAuthenticated,
    isPowerUser: isPowerUser,
    domain: domain,
  });
}
