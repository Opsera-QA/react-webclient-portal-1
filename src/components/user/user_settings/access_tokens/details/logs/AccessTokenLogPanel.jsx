import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import AccessTokenLogTable from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogTable";

function AccessTokenLogPanel({ accessToken }) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (filterDto = null, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, cancelSource);
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

  const getRoles = async (filterDto = null, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      await getActivityLogs(filterDto, cancelSource);
    }
  };

  const getActivityLogs = async (filterDto = null, cancelSource = cancelTokenSource) => {
    const response = await tokenActions.getTokenActivity(getAccessToken, cancelSource, filterDto, accessToken?.getData("_id"));
    const activityLogData = response?.data?.data;

    if (isMounted?.current === true && activityLogData) {
      setActivityLogs(activityLogData);
      // let newFilterDto = filterDto;
      // newFilterDto.setData("totalCount", response?.data?.count);
      // newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      // setTagFilterDto({...newFilterDto});
    }
  };

  return (<AccessTokenLogTable loadData={loadData} isLoading={isLoading} activityLogs={activityLogs}/>);
}

AccessTokenLogPanel.propTypes = {
  accessToken: PropTypes.object,
}

export default AccessTokenLogPanel;
