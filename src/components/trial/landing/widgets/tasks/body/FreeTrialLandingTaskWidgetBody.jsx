import React from "react";
import PropTypes from "prop-types";
import FreeTrialLandingTaskWidgetTaskActivityLogsPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskActivityLogsPanel";
import FreeTrialLandingTaskWidgetTaskSummaryPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskSummaryPanel";
import {
  TASK_WIDGET_HEADER_ITEMS
} from "components/trial/landing/widgets/tasks/FreeTrialLandingTaskWidgetHeaderTabBar";

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
      case TASK_WIDGET_HEADER_ITEMS.SUMMARY:
        return (
          <FreeTrialLandingTaskWidgetTaskSummaryPanel
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className={"m-3"}
          />
        );
      case TASK_WIDGET_HEADER_ITEMS.LOGS:
        return (
          <FreeTrialLandingTaskWidgetTaskActivityLogsPanel
            selectedTask={selectedTask}
            className={"m-3"}
          />
        );
      case TASK_WIDGET_HEADER_ITEMS.METRICS:
        return (selectedHeaderItem);
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