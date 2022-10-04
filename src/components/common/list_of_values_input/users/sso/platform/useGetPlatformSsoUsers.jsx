import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";

export default function useGetPlatformSsoUsers(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [platformSsoUsers, setPlatformSsoUsers] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getRevokedSsoUsers();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRevokedSsoUsers = async () => {
    const response = await ssoUserActions.getPlatformUsers(
      getAccessToken,
      cancelTokenSource,
      );

    const users = DataParsingHelper.parseArray(response?.data?.data, []);

    if (users) {
      setPlatformSsoUsers([...users]);
    }
  };

  return ({
    platformSsoUsers: platformSsoUsers,
    setPlatformSsoUsers: setPlatformSsoUsers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
