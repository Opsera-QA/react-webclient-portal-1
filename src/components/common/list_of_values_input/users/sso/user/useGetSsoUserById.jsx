import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function useGetSsoUserById(userId, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [ssoUser, setSsoUser] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setSsoUser(undefined);

    if (isMongoDbId(userId) === true) {
      loadData().catch(() => {
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setError(undefined);
      setSsoUser(undefined);
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
    const response = await ssoUserActions.getUserById(
      getAccessToken,
      cancelTokenSource,
      userId,
    );

    const user = DataParsingHelper.parseArray(response?.data?.data, []);

    if (user) {
      setSsoUser(user);
    }
  };

  return ({
    ssoUser: ssoUser,
    setSsoUser: setSsoUser,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
