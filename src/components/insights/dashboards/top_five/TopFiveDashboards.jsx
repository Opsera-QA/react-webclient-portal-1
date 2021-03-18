import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import TopFiveDashboardsBadgeView from "components/insights/dashboards/top_five/TopFiveDashboardsBadgeView";
import LoadingIcon from "components/common/icons/LoadingIcon";
import TagsCloudBase from "components/common/fields/tags/cloud/TagsCloudBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";

function TopFiveDashboards() {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getDashboards(cancelSource);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDashboards = async (cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getTopFiveDashboardsV2(getAccessToken, cancelSource);
    const dashboards = response?.data?.data;

    if (isMounted.current === true && dashboards) {
      setDashboardsList(dashboards);
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<div><LoadingIcon isLoading={isLoading} className={"mr-2 my-auto"}/>Loading favorite dashboards</div>);
    }

    return (
      <TopFiveDashboardsBadgeView
        dashboards={dashboardsList}
      />
    );
  };

  return (
    <div>
      <h5>My Top Five Dashboards</h5>
      {getBody()}
    </div>
  );

}


export default TopFiveDashboards;