import React, {useContext, useState, useEffect, useRef} from "react";
import Model from "core/data_model/model";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import axios from "axios";
import DashboardScreenContainer from "components/common/panels/detail_view_container/DashboardScreenContainer";

function DashboardDetailView() {
  const {tab, id} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
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
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await getRoles(cancelSource);
    } catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getDashboard(cancelSource);
    }
  };

  const getDashboard = async (cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, id);

    if (isMounted.current === true && response?.data) {
      setDashboardData(new Model(response.data, dashboardMetadata, false));
      
    }
  };
  console.log(dashboardData,' *** 234234234234234');

  return (
    <DashboardScreenContainer
      dashboardModel={dashboardData}
      setDashboardModel={setDashboardData}
      isLoading={isLoading}
      tab={tab}
      loadData={loadData}
    />
  );
}

export default DashboardDetailView;