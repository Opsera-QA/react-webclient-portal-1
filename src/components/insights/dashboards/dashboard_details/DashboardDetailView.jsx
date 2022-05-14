import React, {useContext, useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import axios from "axios";
import DashboardScreenContainer from "components/common/panels/detail_view_container/DashboardScreenContainer";
import DashboardModel from "components/insights/dashboards/dashboard.model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";

function DashboardDetailView() {
  const {tab, id} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const {  getAccessRoleData, getAccessToken } = useContext(AuthContext);
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
    await getDashboard(cancelSource);
  };

  const getDashboard = async (cancelSource = cancelTokenSource) => {
    const accessRoleData = await getAccessRoleData();

    if (!accessRoleData) {
      setDashboardData(undefined);
      return;
    }

    const response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, id);
    const dashboard = response?.data?.data;

    if (isMounted.current === true && dashboard) {
      // const metadata = response?.data?.metadata;
      const roles = response?.data?.roles;
      setDashboardData(
        new DashboardModel(
          dashboard,
          dashboardMetadata,
          false,
          getAccessToken,
          cancelSource,
          loadData,
          accessRoleData,
          roles,
          setDashboardData,
        ),
      );
    }
  };

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