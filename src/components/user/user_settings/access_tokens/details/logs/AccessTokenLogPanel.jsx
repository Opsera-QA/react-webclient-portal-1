import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import AccessTokenLogTable from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogTable";
import Model from "core/data_model/model";
import accessTokenLogFilterMetadata
  from "components/user/user_settings/access_tokens/details/logs/access-token-log-filter-metadata";

function AccessTokenLogPanel({ accessToken }) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessTokenLogFilterModel, setAccessTokenLogFilterModel] = useState(new Model({...accessTokenLogFilterMetadata.newObjectFields}, accessTokenLogFilterMetadata, false));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(accessTokenLogFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (filterModel = accessTokenLogFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (filterModel = accessTokenLogFilterModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      await getActivityLogs(filterModel, cancelSource);
    }
  };

  const getActivityLogs = async (filterModel = accessTokenLogFilterModel, cancelSource = cancelTokenSource) => {
    const response = await tokenActions.getTokenActivity(getAccessToken, cancelSource, filterModel, accessToken?.getData("_id"));
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
}

export default AccessTokenLogPanel;
