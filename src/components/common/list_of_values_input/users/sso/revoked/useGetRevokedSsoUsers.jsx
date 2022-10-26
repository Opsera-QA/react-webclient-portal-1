import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";

export default function useGetRevokedSsoUsers(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [revokedSsoUsers, setRevokedSsoUsers] = useState([]);
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
    const response = await ssoUserActions.getRevokedUsers(
      getAccessToken,
      cancelTokenSource,
    );

    const revokedUsers = DataParsingHelper.parseArray(response?.data?.data, []);

    if (revokedUsers) {
      setRevokedSsoUsers([...revokedUsers]);
    }
  };

  return ({
    revokedSsoUsers: revokedSsoUsers,
    setRevokedSsoUsers: setRevokedSsoUsers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
