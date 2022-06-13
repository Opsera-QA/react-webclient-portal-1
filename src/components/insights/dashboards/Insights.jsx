import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AnalyticsProfileSettings from "components/settings/analytics/activateAnalyticsCard";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import InsightsHelpDocumentation from "../../common/help/documentation/insights/InsightsHelpDocumentation";
import DashboardTableView
  from "components/insights/dashboards/views/DashboardTableView";
import DashboardFilterModel from "components/insights/dashboards/views/dashboard.filter.model";

function Insights() {
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboards, setDashboards] = useState(undefined);
  const [dashboardFilterModel, setDashboardFilterModel] = useState(undefined);
  const [areAnalyticsToolsEnabled, setAreAnalyticsToolsEnabled] = useState(undefined);
  const [dashboardRoleDefinitions, setDashboardRoleDefinitions] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    const newDashboardFilterModel = new DashboardFilterModel(getAccessToken);

    loadData(newDashboardFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterModel = dashboardFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterModel, cancelSource);
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

  const getRoles = async (filterModel = dashboardFilterModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getProfile(filterModel, cancelSource);
    }
  };

  const getProfile = async(filterDto = dashboardFilterModel, cancelSource = cancelTokenSource) => {
    const response = await analyticsActions.areAnalyticsToolsEnabled(getAccessToken, cancelSource);
    const analyticsAreEnabled = response?.data.areAnalyticsToolsEnabled;
    setAreAnalyticsToolsEnabled(analyticsAreEnabled);

    if (isMounted.current === true && analyticsAreEnabled === true) {
      await getDashboards(filterDto, cancelSource);
    }
  };

  const getDashboards = async (filterModel = dashboardFilterModel, cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getAllDashboardsV2(
      getAccessToken,
      cancelSource,
      filterModel,
    );
    const dashboards = response?.data?.data;

    if (isMounted.current === true && dashboards) {
      setDashboardRoleDefinitions(response?.data?.roles);
      setDashboards(dashboards);
      filterModel.updateTotalCount(response?.data?.count);
      filterModel.updateActiveFilters();
      setDashboardFilterModel({...filterModel});
    }
  };

  const getInsightsView = () => {
    if (areAnalyticsToolsEnabled == null) {
      return (
        <LoadingDialog
          size={"sm"}
          message={"Loading Insights"}
        />
      );
    }

    if (areAnalyticsToolsEnabled === true) {
      return (
        <DashboardTableView
          isLoading={isLoading}
          loadData={loadData}
          dashboards={dashboards}
          dashboardFilterModel={dashboardFilterModel}
          setDashboardFilterModel={setDashboardFilterModel}
        />
      );
    }

    return (
      <div className="mt-1 max-content-width mb-1">
        <AnalyticsProfileSettings />
      </div>
    );
  };

  const getHelpDocumentation = () => {
    if (isLoading !== true) {
      return (
        <InsightsHelpDocumentation
          dashboardRoleDefinitions={dashboardRoleDefinitions}
        />
      );
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"dashboards"} />}
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the Opsera Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insights"}
      helpComponent={
        getHelpDocumentation()
      }
    >
      {getInsightsView()}
    </ScreenContainer>
  );

}


export default Insights;