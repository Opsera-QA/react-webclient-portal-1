import React from "react";
import PropTypes from "prop-types";
import FreeTrialLandingTaskWidgetTaskSummaryPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskSummaryPanel";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import ActionBarDeleteTaskButton from "components/tasks/buttons/ActionBarDeleteTaskButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import {
  FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidgetHeaderTabBarBase";

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
          <div className={"mb-2"}>
            <TaskActivityPanel
              taskModel={selectedTask}
            />
          </div>
        );
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS:
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
      <ActionBarContainer>
        <div />
        <ActionBarDeleteTaskButton
          taskModel={selectedTask}
        />
      </ActionBarContainer>
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