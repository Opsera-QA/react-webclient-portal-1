import {useEffect, useState} from "react";
import useAccessTokenActivityLogActions from "hooks/access_tokens/logs/useAccessTokenActivityLogActions";
import Model from "core/data_model/model";
import accessTokenLogFilterMetadata
from "components/user/user_settings/access_tokens/details/logs/access-token-log-filter-metadata";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetAccessTokenActivityLogs(
  handleErrorFunction,
) {
  const [accessTokenActivityLogs, setAccessTokenActivityLogs] = useState([]);
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
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  useEffect(() => {
    if (loadData && (isSecurityManager === true || isSiteAdministrator === true || isAuditor === true)) {
      loadData(getUserAccessTokenActivityLogs, handleErrorFunction);
    }
  }, []);

  const getUserAccessTokenActivityLogs = async (newFilterModel = accessTokenLogFilterModel) => {
    setAccessTokenActivityLogs([]);

    if (userData == null) {
      return null;
    }

    const response = await accessTokenActivityLogActions.getAccessTokenActivityLogs(newFilterModel);
    const activityLogs = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setAccessTokenActivityLogs([...activityLogs]);
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
    setAccessTokenLogFilterModel({...newFilterModel});
  };

  return {
    accessTokenLogFilterModel: accessTokenLogFilterModel,
    setAccessTokenLogFilterModel: setAccessTokenLogFilterModel,
    accessTokenActivityLogs: accessTokenActivityLogs,
    isLoading: isLoading,
    apiState: apiState,
    error: error,
    loadData: () => loadData(getUserAccessTokenActivityLogs, handleErrorFunction),
  };
}
