import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";

function useComponentStateReference() {
  const isMounted = useRef(false);
  const [cancelTokenSource] = useState(axios.CancelToken.source());
  const {
    getAccessToken,
    userAccessRoles,
    isSassUser,
    isOpseraAdministrator,
    featureFlagHideItemInProd,
    featureFlagHideItemInTest,
    isSiteAdministrator,
    userData,
  } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      cancelTokenSource.cancel();
      // toastContext.removeAllBanners();
      isMounted.current = false;
    };
  }, []);

  return ({
    isMounted: isMounted,
    cancelTokenSource: cancelTokenSource,
    getAccessToken: getAccessToken,
    toastContext: toastContext,
    accessRoleData: userAccessRoles,
    isOpseraAdministrator: isOpseraAdministrator(),
    isSiteAdministrator: isSiteAdministrator,
    isProductionEnvironment: featureFlagHideItemInProd(),
    isTestEnvironment: featureFlagHideItemInTest(),
    isSassUser: isSassUser(),
    userData: userData,
    isFreeTrial: false,
  });
}

export default useComponentStateReference;
