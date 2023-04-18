import React, { useState } from "react";
import PropTypes from "prop-types";
import ActionBarDeleteTaskButton from "components/tasks/buttons/ActionBarDeleteTaskButton";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase, {
  TASK_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/landing/v2/widgets/tasks/SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase";
import SoftwareDevelopmentLandingTaskWidgetAnalyticsBody
  from "components/landing/v2/widgets/tasks/analytics/SoftwareDevelopmentLandingTaskWidgetAnalyticsBody";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import TaskSummaryPanel from "components/tasks/details/TaskSummaryPanel";
import useGetPollingTaskModelById from "hooks/workflow/tasks/useGetPollingTaskModelById";

export default function SoftwareDevelopmentLandingTaskWorkflowWidget(
  {
    className,
    selectedTask,
    setSelectedTask,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(TASK_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY);
  const {
    taskModel,
    setTaskModel,
    isLoading,
    error,
    loadData,
    status,
    runCount,
  } = useGetPollingTaskModelById(selectedTask?._id);


  const getTitleBar = () => {
    return (
      <div className={"w-100"}>
        {selectedTask?.getData("name")}
      </div>
    );
  };

  const getBody = () => {
    switch (selectedHeaderItem) {
      case TASK_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY:
        return (
          <div className={"m-3"}>
            <TaskSummaryPanel
              gitTasksData={taskModel || selectedTask}
              setGitTasksData={setTaskModel}
            />
          </div>
        );
      case TASK_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS:
        return (
          <div className={"m-3"}>
            <TaskActivityPanel
              taskModel={taskModel || selectedTask}
              showFilterContainerIcon={false}
              taskId={selectedTask?.getMongoDbId()}
              taskRunCount={runCount}
              status={status}
            />
          </div>
        );
      case TASK_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS:
        return (
          <SoftwareDevelopmentLandingTaskWidgetAnalyticsBody
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

  return (
    <div className={className}>
      <WidgetDataBlockBase
        title={getTitleBar()}
        isLoading={isLoading}
      >
        <div className={"d-flex justify-content-between"}>
          <SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase
            selectedHeaderItem={selectedHeaderItem}
            setSelectedHeaderItem={setSelectedHeaderItem}
            selectedWorkflow={selectedTask}
            setSelectedWorkflow={setSelectedTask}
          />
          <div className={"mr-2 mt-2"}>
            <ActionBarDeleteTaskButton
              taskModel={selectedTask}
              refreshAfterDeletion={true}
            />
          </div>
        </div>
        {getBody()}
      </WidgetDataBlockBase>
    </div>
  );
}

SoftwareDevelopmentLandingTaskWorkflowWidget.propTypes = {
  className: PropTypes.string,
  selectedTask: PropTypes.object,
  setSelectedTask: PropTypes.func,
};
