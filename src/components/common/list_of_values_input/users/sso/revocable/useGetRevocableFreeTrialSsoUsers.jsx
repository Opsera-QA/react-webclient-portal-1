import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {
  freeTrialUserExpirationActions
} from "components/settings/trial/user_expiration/freeTrialUserExpiration.actions";

export default function useGetRevocableFreeTrialSsoUsers(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(false);
  const [revocableFreeTrialUsers, setRevocableFreeTrialUsers] = useState([]);
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
    const response = await freeTrialUserExpirationActions.getRevocableFreeTrialUserList(
      getAccessToken,
      cancelTokenSource,
    );

    const revocableUsers = DataParsingHelper.parseArray(response?.data?.data, []);

    if (revocableFreeTrialUsers) {
      setRevocableFreeTrialUsers([...revocableUsers]);
    }
  };

  return ({
    revocableFreeTrialUsers: revocableFreeTrialUsers,
    setRevocableFreeTrialUsers: setRevocableFreeTrialUsers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
