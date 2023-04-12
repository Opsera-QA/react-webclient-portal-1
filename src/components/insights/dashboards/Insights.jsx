import React, {useEffect, useState} from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AnalyticsProfileSettings from "components/settings/analytics/activateAnalyticsCard";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import InsightsHelpDocumentation from "../../common/help/documentation/insights/InsightsHelpDocumentation";
import DashboardTableView
  from "components/insights/dashboards/views/DashboardTableView";
import DashboardFilterModel from "components/insights/dashboards/views/dashboard.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";

function Insights() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboards, setDashboards] = useState(undefined);
  const [dashboardFilterModel, setDashboardFilterModel] = useState(undefined);
  const [areAnalyticsToolsEnabled, setAreAnalyticsToolsEnabled] = useState(undefined);
  const [dashboardRoleDefinitions, setDashboardRoleDefinitions] = useState([]);
  const {
    cancelTokenSource,
    getAccessToken,
    toastContext,
    isMounted,
    accessRoleData,
  } = useComponentStateReference();

  useEffect(() => {
    const newDashboardFilterModel = new DashboardFilterModel(getAccessToken);
    loadData(newDashboardFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterModel = dashboardFilterModel) => {
    try {
      setIsLoading(true);
      await getProfile(filterModel);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getProfile = async(filterDto = dashboardFilterModel) => {
    const response = await analyticsActions.areAnalyticsToolsEnabled(getAccessToken, cancelTokenSource);
    const analyticsAreEnabled = response?.data.areAnalyticsToolsEnabled;
    setAreAnalyticsToolsEnabled(analyticsAreEnabled);

    if (isMounted.current === true && analyticsAreEnabled === true) {
      await getDashboards(filterDto);
    }
  };

  const getDashboards = async (filterModel = dashboardFilterModel) => {
    const response = await dashboardsActions.getAllDashboardsV2(
      getAccessToken,
      cancelTokenSource,
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