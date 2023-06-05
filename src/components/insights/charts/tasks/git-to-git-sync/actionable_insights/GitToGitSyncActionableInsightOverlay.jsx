import React, { useState } from "react";
import PropTypes from "prop-types";

import GitToGitSyncDetailedRunSummaryOverlay
  from "./detailed_run_summary/GitToGitSyncDetailedRunSummaryOverlay";
import GitToGitSyncActionableInsightSubNavigationBar
  from "./GitToGitSyncActionableInsightSubNavigationBar";

export const GIT_TO_GIT_SYNC_ACTIONABLE_INSIGHT_SCREENS = {
  GIT_TO_GIT_SYNC_RUN_SUMMARY: "git_to_git_sync_run_summary",
};

export default function GitToGitSyncActionableInsightOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
  }) {
  const [currentScreen, setCurrentScreen] = useState(GIT_TO_GIT_SYNC_ACTIONABLE_INSIGHT_SCREENS.GIT_TO_GIT_SYNC_RUN_SUMMARY);

  const getBreadcrumbBar = () => {
    return (
      <GitToGitSyncActionableInsightSubNavigationBar
        setCurrentScreen={setCurrentScreen}
        currentScreen={currentScreen}
      />
    );
  };

  const getBody = () => {
    switch (currentScreen) {
      case GIT_TO_GIT_SYNC_ACTIONABLE_INSIGHT_SCREENS.GIT_TO_GIT_SYNC_RUN_SUMMARY:
        return (
          <GitToGitSyncDetailedRunSummaryOverlay
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            dashboardFilters={dashboardFilters}
            taskId={taskId}
            taskName={taskName}
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

GitToGitSyncActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  taskName: PropTypes.string,
};
