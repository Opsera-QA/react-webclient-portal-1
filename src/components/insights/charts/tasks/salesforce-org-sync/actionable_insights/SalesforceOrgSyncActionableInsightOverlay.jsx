import React, { useState } from "react";
import PropTypes from "prop-types";

import SalesforceOrgSyncDetailedRunSummaryOverlay
  from "./detailed_run_summary/SalesforceOrgSyncDetailedRunSummaryOverlay";
import SalesforceOrgSyncUniqueRunSummaryOverlay
  from "./unique_run_summary/SalesforceOrgSyncUniqueRunSummaryOverlay";
import SalesforceOrgSyncActionableInsightSubNavigationBar
  from "./SalesforceOrgSyncActionableInsightSubNavigationBar";

export const SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS = {
  SALESFORCE_ORG_SYNC_RUN_SUMMARY: "salesforce_org_sync_run_summary",
  SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY: "salesforce_org_sync_component_summary",
};

export default function SalesforceOrgSyncActionableInsightOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
  }) {
  const [currentScreen, setCurrentScreen] = useState(SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_RUN_SUMMARY);
  const [selectedRunObject, setSelectedRunObject] = useState(undefined);

  const getBreadcrumbBar = () => {
    return (
      <SalesforceOrgSyncActionableInsightSubNavigationBar
        setCurrentScreen={setCurrentScreen}
        currentScreen={currentScreen}
        setSelectedRunObject={setSelectedRunObject}
      />
    );
  };

  const getBody = () => {
    switch (currentScreen) {
      case SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_RUN_SUMMARY:
        return (
          <SalesforceOrgSyncDetailedRunSummaryOverlay
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            dashboardFilters={dashboardFilters}
            taskId={taskId}
            taskName={taskName}
            setCurrentScreen={setCurrentScreen}
            setSelectedRunObject={setSelectedRunObject}
            breadcrumbBar={getBreadcrumbBar()}
          />
        );
      case SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY:
        return (
          <SalesforceOrgSyncUniqueRunSummaryOverlay
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            setCurrentScreen={setCurrentScreen}
            selectedRunObject={selectedRunObject}
            setSelectedRunObject={setSelectedRunObject}
            breadcrumbBar={getBreadcrumbBar()}
          />
        );
    }
  };

  return (
    <>
      {getBody()}
    </>
  );
}

SalesforceOrgSyncActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  taskName: PropTypes.string,
};
