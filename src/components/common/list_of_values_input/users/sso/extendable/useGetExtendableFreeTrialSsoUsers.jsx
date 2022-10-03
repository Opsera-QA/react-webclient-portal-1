import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {
  freeTrialUserExpirationActions
} from "components/settings/trial/user_expiration/freeTrialUserExpiration.actions";

export default function useGetExtendableFreeTrialSsoUsers(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [extendableSsoUsers, setExtendableSsoUsers] = useState([]);
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
      await getExtendableSsoUsers();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getExtendableSsoUsers = async () => {
    const response = await freeTrialUserExpirationActions.getExtendableUserList(
      getAccessToken,
      cancelTokenSource,
    );

    const extendableUsers = DataParsingHelper.parseArray(response?.data?.data, []);

    if (extendableSsoUsers) {
      setExtendableSsoUsers([...extendableUsers]);
    }
  };

  return ({
    extendableSsoUsers: extendableSsoUsers,
    setExtendableSsoUsers: setExtendableSsoUsers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
