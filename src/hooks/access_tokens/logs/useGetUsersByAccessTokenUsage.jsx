import {useEffect, useState} from "react";
import useAccessTokenActivityLogActions from "hooks/access_tokens/logs/useAccessTokenActivityLogActions";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetUsersByAccessTokenUsage(handleErrorFunction,) {
  const [users, setUsers] = useState([]);
  const accessTokenActivityLogActions = useAccessTokenActivityLogActions();
  const {
    isLoading,
    error,
    loadData,
    apiState,
  } = useLoadData();

  useEffect(() => {
    if (loadData) {
      loadData(getUsersByAccessTokenUsage, handleErrorFunction);
    }
  }, []);

  const getUsersByAccessTokenUsage = async () => {
    setUsers([]);
    const response = await accessTokenActivityLogActions.getUsersByAccessTokenUsage();
    const users = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setUsers([...users]);
  };

  return {
    users: users,
    isLoading: isLoading,
    apiState: apiState,
    error: error,
    loadData: () => loadData(getUsersByAccessTokenUsage, handleErrorFunction),
  };
}
