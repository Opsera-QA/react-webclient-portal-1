import React from "react";
import PropTypes from "prop-types";
import FreeTrialLandingTaskWidgetTaskActivityLogsPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskActivityLogsPanel";
import FreeTrialLandingTaskWidgetTaskSummaryPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskSummaryPanel";
import {
  TASK_WIDGET_HEADER_ITEMS
} from "components/trial/landing/widgets/tasks/FreeTrialLandingTaskWidgetHeaderTabBar";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ActionBarDeleteTaskButton from "components/tasks/buttons/ActionBarDeleteTaskButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";

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
            className={"mx-2 mb-2"}
          />
        );
      case TASK_WIDGET_HEADER_ITEMS.LOGS:
        return (
          <div className={"mb-2"}>
            <TaskActivityPanel
              taskModel={selectedTask}
            />
          </div>
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