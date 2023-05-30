import React, { useState } from "react";
import PropTypes from "prop-types";

import SalesforceToGitMergeSyncDetailedRunSummaryOverlay
  from "./detailed_run_summary/SalesforceToGitMergeSyncDetailedRunSummaryOverlay";
import SalesforceToGitMergeSyncUniqueRunSummaryOverlay
  from "./unique_run_summary/SalesforceToGitMergeSyncUniqueRunSummaryOverlay";
import SalesforceToGitMergeSyncActionableInsightSubNavigationBar
  from "./SalesforceToGitMergeSyncActionableInsightSubNavigationBar";

export const SALESFORCE_TO_GIT_MERGE_SYNC_ACTIONABLE_INSIGHT_SCREENS = {
  SALESFORCE_TO_GIT_MERGE_SYNC_RUN_SUMMARY: "salesforce_to_git_merge_sync_run_summary",
  SALESFORCE_TO_GIT_MERGE_SYNC_COMPONENT_SUMMARY: "salesforce_to_git_merge_sync_component_summary",
};

export default function SalesforceToGitMergeSyncActionableInsightOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
  }) {
  const [currentScreen, setCurrentScreen] = useState(SALESFORCE_TO_GIT_MERGE_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_TO_GIT_MERGE_SYNC_RUN_SUMMARY);
  const [selectedRunObject, setSelectedRunObject] = useState(undefined);

  const getBreadcrumbBar = () => {
    return (
      <SalesforceToGitMergeSyncActionableInsightSubNavigationBar
        setCurrentScreen={setCurrentScreen}
        currentScreen={currentScreen}
        setSelectedRunObject={setSelectedRunObject}
      />
    );
  };

  const getBody = () => {
    switch (currentScreen) {
      case SALESFORCE_TO_GIT_MERGE_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_TO_GIT_MERGE_SYNC_RUN_SUMMARY:
        return (
          <SalesforceToGitMergeSyncDetailedRunSummaryOverlay
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
      case SALESFORCE_TO_GIT_MERGE_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_TO_GIT_MERGE_SYNC_COMPONENT_SUMMARY:
        return (
          <SalesforceToGitMergeSyncUniqueRunSummaryOverlay
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

SalesforceToGitMergeSyncActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  taskName: PropTypes.string,
};
