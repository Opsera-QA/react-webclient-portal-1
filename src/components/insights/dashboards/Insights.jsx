import React, {useEffect} from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AnalyticsProfileSettings from "components/settings/analytics/activateAnalyticsCard";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import InsightsHelpDocumentation from "../../common/help/documentation/insights/InsightsHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetDashboards from "hooks/insights/dashboards/useGetDashboards";
import InsightsFilterOverlay from "components/insights/dashboards/InsightsFilterOverlay";
import DashboardRoleHelper from "@opsera/know-your-role/roles/analytics/dashboards/dashboardRole.helper";
import CreateNewDashboardOverlay from "components/insights/dashboards/CreateNewDashboardOverlay";
import InlineDashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/InlineDashboardTypeFilter";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import DashboardsTable from "components/insights/dashboards/views/DashboardsTable";
import DashboardVerticalTabContainer from "components/insights/dashboards/views/DashboardVerticalTabContainer";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";

export default function Insights() {
  const {
    areAnalyticsToolsEnabled,
    userData,
    toastContext,
  } = useComponentStateReference();
  const {
    dashboards,
    dashboardFilterModel,
    setDashboardFilterModel,
    loadData,
    isLoading,
    error,
  } = useGetDashboards(
    undefined,
    true,
  );

  useEffect(() => {}, [areAnalyticsToolsEnabled]);

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
        <PaginationContainer
          loadData={loadData}
          isLoading={isLoading}
          filterDto={dashboardFilterModel}
          setFilterDto={setDashboardFilterModel}
          data={dashboards}
          nextGeneration={true}
        >
          <SideBySideViewBase
            leftSideView={getVerticalTabContainer()}
            rightSideView={getDashboardsTable()}
            leftSideMinimumWidth={"200px"}
            leftSideMaximumWidth={"200px"}
            minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
          />
        </PaginationContainer>
      );
    }

    return (
      <div className="mt-1 max-content-width mb-1">
        <AnalyticsProfileSettings />
      </div>
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <DashboardVerticalTabContainer
        dashboardFilterModel={dashboardFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };


  const getDashboardsTable = () => {
    return (
      <DashboardsTable
        dashboards={dashboards}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  const createNewDashboard = () => {
    toastContext.showOverlayPanel(
      <CreateNewDashboardOverlay
        loadData={loadData}
      />
    );
  };

  const getInlineFilters = () => {
    if (areAnalyticsToolsEnabled === true) {
      return (
        <InlineDashboardTypeFilter
          filterModel={dashboardFilterModel}
          setFilterModel={setDashboardFilterModel}
          loadData={loadData}
          className={"ml-2"}
        />
      );
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"dashboards"} />}
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the Opsera Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insights"}
      helpComponent={<InsightsHelpDocumentation />}
      filterModel={dashboardFilterModel}
      setFilterModel={setDashboardFilterModel}
      filterOverlay={<InsightsFilterOverlay dashboardFilterModel={dashboardFilterModel} loadDataFunction={loadData} />}
      loadDataFunction={loadData}
      isSoftLoading={isLoading}
      addRecordFunction={areAnalyticsToolsEnabled === true && DashboardRoleHelper.canCreateDashboard(userData) ? createNewDashboard : undefined}
      titleActionBar={getInlineFilters()}
      error={error}
    >
      {getInsightsView()}
    </ScreenContainer>
  );
}
