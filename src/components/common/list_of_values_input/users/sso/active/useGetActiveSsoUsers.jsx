import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";

export default function useGetActiveSsoUsers(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(false);
  const [activeSsoUsers, setActiveSsoUsers] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getActiveSsoUsers();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveSsoUsers = async () => {
    const response = await ssoUserActions.getActiveUsers(
      getAccessToken,
      cancelTokenSource,
    );

    const activeUsers = DataParsingHelper.parseArray(response?.data?.data, []);

    if (activeSsoUsers) {
      setActiveSsoUsers([...activeUsers]);
    }
  };

  return ({
    activeSsoUsers: activeSsoUsers,
    setActiveSsoUsers: setActiveSsoUsers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
