import React, { useState } from "react";
import PropTypes from "prop-types";

import BulkMigrationDetailedRunSummaryOverlay
  from "./detailed_run_summary/BulkMigrationDetailedRunSummaryOverlay";
import BulkMigrationActionableInsightSubNavigationBar
  from "./BulkMigrationActionableInsightSubNavigationBar";

export const BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS = {
  BULK_MIGRATION_RUN_SUMMARY: "bulk_migration_run_summary",
};

export default function BulkMigrationActionableInsightOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
  }) {
  const [currentScreen, setCurrentScreen] = useState(BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS.BULK_MIGRATION_RUN_SUMMARY);

  const getBreadcrumbBar = () => {
    return (
      <BulkMigrationActionableInsightSubNavigationBar
        setCurrentScreen={setCurrentScreen}
        currentScreen={currentScreen}
      />
    );
  };

  const getBody = () => {
    switch (currentScreen) {
      case BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS.BULK_MIGRATION_RUN_SUMMARY:
        return (
          <BulkMigrationDetailedRunSummaryOverlay
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

BulkMigrationActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  taskName: PropTypes.string,
};
