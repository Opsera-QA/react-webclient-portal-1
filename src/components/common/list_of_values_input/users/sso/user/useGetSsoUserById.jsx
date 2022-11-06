import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";

export default function useGetSsoUserById(
  userId,
  handleErrorFunction,
) {
  const [ssoUser, setSsoUser] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData(
    handleErrorFunction,
  );

  useEffect(() => {
    setSsoUser(undefined);

    if (isMongoDbId(userId) === true && loadData) {
      loadData(getSsoUser).catch(() => {});
    }
  }, [userId]);

  const getSsoUser = async () => {
    if (isMongoDbId(userId) !== true) {
      return;
    }

    const response = await ssoUserActions.getUserById(
      getAccessToken,
      cancelTokenSource,
      userId,
    );

    const user = DataParsingHelper.parseObject(response?.data);

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
