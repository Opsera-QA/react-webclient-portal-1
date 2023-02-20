import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import useIsMountedStateReference from "hooks/useIsMountedStateReference";
import useAxiosCancelToken from "hooks/useAxiosCancelToken";
import useAccessRoleData from "hooks/roles/useAccessRoleData";

export default function useComponentStateReference() {
  const isMounted = useIsMountedStateReference();
  const {
    cancelTokenSource,
    getNewCancelToken,
  } = useAxiosCancelToken();
  const {
    getAccessToken,
    themeConstants,
    featureFlagHideItemInProd,
    featureFlagHideItemInTest,
    userData,
    backgroundColor,
    isAuthenticated,
    renewUserToken,
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
  } = useAccessRoleData();

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
    isProductionEnvironment: featureFlagHideItemInProd(),
    isTestEnvironment: featureFlagHideItemInTest(),
    isSassUser: isSaasUser, // TODO: Remove and replace with the proper spelling
    isSaasUser: isSaasUser,
    userData: userData,
    loadUserData: renewUserToken,
    isFreeTrial: false,
    backgroundColor: backgroundColor,
    isAuthenticated: isAuthenticated,
    isPowerUser: isPowerUser,
  });
}
