import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import useIsMountedStateReference from "hooks/useIsMountedStateReference";
import useCancelTokenStateReference from "hooks/useCancelTokenStateReference";

function useComponentStateReference() {
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
    userData,
  } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    return () => {
      toastContext.removeAllBanners();
    };
  }, []);

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
    isSassUser: isSassUser(), // TODO: Test this and ensure it doesn't cause anything weird
    userData: userData,
    isFreeTrial: true,
  });
}

export default useComponentStateReference;
