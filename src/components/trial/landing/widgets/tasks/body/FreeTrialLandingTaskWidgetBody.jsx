import React from "react";
import PropTypes from "prop-types";
import FreeTrialLandingTaskWidgetTaskSummaryPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskSummaryPanel";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import {
  FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidgetHeaderTabBarBase";
import FreeTrialLandingTaskWidgetAnalyticsBody
  from "components/trial/landing/widgets/tasks/analytics/FreeTrialLandingTaskWidgetAnalyticsBody";
import FreeTrialLandingTaskWidgetTaskActivityLogsPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskActivityLogsPanel";

export default function FreeTrialLandingTaskWidgetBody(
  {
    selectedTask,
    setSelectedTask,
    selectedHeaderItem,
    isLoading,
    setIsLoading,
  }) {
  const getBody = () => {
    switch (selectedHeaderItem) {
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY:
        return (
          <FreeTrialLandingTaskWidgetTaskSummaryPanel
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className={"mx-2 mb-2"}
          />
        );
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS:
        return (
          <FreeTrialLandingTaskWidgetTaskActivityLogsPanel
            taskModel={selectedTask}
            className={"m-2 mb-3"}
          />
        );
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS:
        return (
          <FreeTrialLandingTaskWidgetAnalyticsBody
            className={"m-3"}
          />
        );
      default:
        return (
          <div>
            Please select a Task.
          </div>
        );
    }
  };

  if (selectedTask == null) {
    return null;
  }

  return (
    <div>
      {getBody()}
    </div>
  );
}

FreeTrialLandingTaskWidgetBody.propTypes = {
  selectedTask: PropTypes.object,
  setSelectedTask: PropTypes.func,
  selectedTaskId: PropTypes.string,
  selectedHeaderItem: PropTypes.string,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};