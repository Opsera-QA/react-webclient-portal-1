import {useEffect, useState} from "react";
import useAccessTokenActivityLogActions from "hooks/access_tokens/useAccessTokenActivityLogActions";
import Model from "core/data_model/model";
import accessTokenLogFilterMetadata
  from "components/user/user_settings/access_tokens/details/logs/access-token-log-filter-metadata";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetUserAccessTokenActivityLogs(
  userId,
  handleErrorFunction,
) {
  const [userAccessTokenActivityLogs, setUserAccessTokenActivityLogs] = useState([]);
  const [accessTokenLogFilterModel, setAccessTokenLogFilterModel] = useState(new Model({...accessTokenLogFilterMetadata.newObjectFields}, accessTokenLogFilterMetadata, false));
  const accessTokenActivityLogActions = useAccessTokenActivityLogActions();
  const {
    isLoading,
    error,
    loadData,
    apiState,
  } = useLoadData();
  const {
    userData,
    isSiteAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    const currentUserId = DataParsingHelper.parseNestedMongoDbId(userData, "_id");
    if (loadData && userId && (currentUserId === userId || isSiteAdministrator === true)) {
      loadData(getUserAccessTokenActivityLogs, handleErrorFunction);
    }
  }, [userId]);

  const getUserAccessTokenActivityLogs = async (newFilterModel = accessTokenLogFilterModel) => {
    setUserAccessTokenActivityLogs([]);

    if (userData == null) {
      return null;
    }

    const response = await accessTokenActivityLogActions.getUserAccessTokenActivityLogs(userId, newFilterModel);
    const activityLogs = DataParsingHelper.parseNestedObject(response, "data.data", []);
    setUserAccessTokenActivityLogs([...activityLogs]);
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
    setAccessTokenLogFilterModel({...newFilterModel});
  };

  return {
    accessTokenLogFilterModel: accessTokenLogFilterModel,
    setAccessTokenLogFilterModel: setAccessTokenLogFilterModel,
    userAccessTokenActivityLogs: userAccessTokenActivityLogs,
    isLoading: isLoading,
    apiState: apiState,
    error: error,
    loadData: () => loadData(getUserAccessTokenActivityLogs, handleErrorFunction),
  };
}
