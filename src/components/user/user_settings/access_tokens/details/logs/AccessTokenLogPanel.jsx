import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import AccessTokenLogTable from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogTable";
import Model from "core/data_model/model";
import accessTokenLogFilterMetadata
  from "components/user/user_settings/access_tokens/details/logs/access-token-log-filter-metadata";
import useComponentStateReference from "hooks/useComponentStateReference";

function AccessTokenLogPanel({ accessToken }) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessTokenLogFilterModel, setAccessTokenLogFilterModel] = useState(new Model({...accessTokenLogFilterMetadata.newObjectFields}, accessTokenLogFilterMetadata, false));
  const {
    cancelTokenSource,
    toastContext,
    isMounted,
    accessRoleData,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(accessTokenLogFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterModel = accessTokenLogFilterModel) => {
    try {
      setIsLoading(true);
      await getActivityLogs(filterModel);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getActivityLogs = async (filterModel = accessTokenLogFilterModel) => {
    const response = await tokenActions.getTokenActivity(getAccessToken, cancelTokenSource, filterModel, accessToken?.getData("_id"));
    const activityLogData = response?.data?.data;

    if (isMounted?.current === true && activityLogData) {
      setActivityLogs(activityLogData);
      let newFilterModel = filterModel;
      newFilterModel.setData("totalCount", response?.data?.count);
      newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
      setAccessTokenLogFilterModel({...newFilterModel});
    }
  };

  return (
    <AccessTokenLogTable
      loadData={loadData}
      isLoading={isLoading}
      activityLogs={activityLogs}
      filterModel={accessTokenLogFilterModel}
      setFilterModel={setAccessTokenLogFilterModel}
    />
  );
}

AccessTokenLogPanel.propTypes = {
  accessToken: PropTypes.object,
};

export default AccessTokenLogPanel;
