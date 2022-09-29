import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import useIsMountedStateReference from "hooks/useIsMountedStateReference";
import useCancelTokenStateReference from "hooks/useCancelTokenStateReference";

export default function useComponentStateReference() {
  const isMounted = useIsMountedStateReference();
  const cancelTokenSource = useCancelTokenStateReference();
  const {
    getAccessToken,
    userAccessRoles,
    themeConstants,
    isSassUser,
    isOpseraAdministrator,
    featureFlagHideItemInProd,
    featureFlagHideItemInTest,
    isSiteAdministrator,
    isPowerUser,
    userData,
    backgroundColor,
    isAuthenticated,
  } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {}, []);

  return ({
    isMounted: isMounted,
    cancelTokenSource: cancelTokenSource,
    getAccessToken: getAccessToken,
    toastContext: toastContext,
    accessRoleData: userAccessRoles,
    themeConstants: themeConstants,
    isOpseraAdministrator: isOpseraAdministrator(),
    isSiteAdministrator: isSiteAdministrator,
    isProductionEnvironment: featureFlagHideItemInProd(),
    isTestEnvironment: featureFlagHideItemInTest(),
    isSassUser: isSassUser(), // TODO: Remove and replace with the proper spelling
    isSaasUser: isSassUser(),
    userData: userData,
    isFreeTrial: true,
    backgroundColor: backgroundColor,
    isAuthenticated: isAuthenticated,
    isPowerUser: isPowerUser,
  });
}
