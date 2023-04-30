import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePlatformUsersActions from "hooks/platform/users/usePlatformUsersActions";
import useAuthenticationToken from "hooks/general/api/useAuthenticationToken";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useReactLogger from "temp-library-components/hooks/useReactLogger";

// TODO: Don't use this for general userData pull, get that from useComponentStateReference
export default function useGetLoggedInUser(
  handleErrorFunction,
) {
  const [userData, setUserData] = useState(undefined);
  const platformUsersActions = usePlatformUsersActions();
  const reactLogger = useReactLogger();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const {
    isAuthenticated,
  } = useAuthenticationToken();

  useEffect(() => {
    if (loadData && isAuthenticated === true) {
      loadData(getLoggedInUser, handleErrorFunction).catch(() => {
      });
    }
  }, [isAuthenticated,]);

  const getLoggedInUser = async () => {
    try {
      const response = await platformUsersActions.getLoggedInUser();
      const newUser = DataParsingHelper.parseObject(response?.data);

      if (ObjectHelper.areObjectsEqualLodash(newUser, userData) !== true) {
        setUserData(newUser);
      } else {
        reactLogger.logDebugMessage(
          "AppWithRouterAccess",
          "loadUsersData",
          "Skipping User state update as it has not changed."
        );
      }
    } catch (error) {
      //console.log(error.response.data); //Forbidden
      //console.log(error.response.status); //403
      const errorStatus = DataParsingHelper.parseNestedNumber(error, "response.status");
      if (errorStatus === 403) {
        //this means user doesn't have access so clearing sessiong and logging user out
        let errorMsg = "Access denied when trying to retrieve user details.  This could indicate an expired or revoked token.  Please log back in before proceeding.";
        console.error(errorMsg + "Service Response:" + error.response.data);
        history.push("/logout");
        setError(errorMsg);
      } else if (errorStatus === 409) {
        console.error(error);
        setUserData(undefined);
        setError(error);
        history.push("/login");
      } else {
        console.error(error);
        setError(error);
      }
    }
  };

  return ({
    userData: userData,
    setUserData: setUserData,
    error: error,
    loadData: () => loadData(getLoggedInUser, handleErrorFunction),
    isLoading: isLoading,
  });
}
