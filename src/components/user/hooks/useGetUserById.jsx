import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";

export default function useGetUserById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setUser(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getSsoUserById();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSsoUserById = async () => {
    const response = await ssoUserActions.getUserById(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const user = response?.data;

    if (user) {
      setUser({...user});
    }
  };

  return ({
    isLoading: isLoading,
    error: error,
    loadData: loadData,
    user: user,
  });
}
