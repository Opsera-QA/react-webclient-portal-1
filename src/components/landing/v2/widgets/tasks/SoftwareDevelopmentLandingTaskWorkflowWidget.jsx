import React, { useState } from "react";
import PropTypes from "prop-types";
import FreeTrialLandingTaskWidgetBody from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetBody";
import ActionBarDeleteTaskButton from "components/tasks/buttons/ActionBarDeleteTaskButton";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase, {
  TASK_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/landing/v2/widgets/tasks/SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase";
import FreeTrialLandingTaskWidgetTaskSummaryPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskSummaryPanel";
import FreeTrialLandingTaskWidgetTaskActivityLogsPanel
  from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetTaskActivityLogsPanel";
import FreeTrialLandingTaskWidgetAnalyticsBody
  from "components/trial/landing/widgets/tasks/analytics/FreeTrialLandingTaskWidgetAnalyticsBody";
import SoftwareDevelopmentLandingTaskWidgetAnalyticsBody
  from "components/landing/v2/widgets/tasks/analytics/SoftwareDevelopmentLandingTaskWidgetAnalyticsBody";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import TaskSummaryPanel from "components/tasks/details/TaskSummaryPanel";

export default function SoftwareDevelopmentLandingTaskWorkflowWidget(
  {
    className,
    selectedTask,
    setSelectedTask,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(TASK_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY);
  const [isLoading, setIsLoading] = useState(false);
  const [taskIsLoading, setTaskIsLoading] = useState(false);

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
          <div className={"mx-2 mb-2"}>
            <TaskSummaryPanel
              gitTasksData={selectedTask}
              setGitTasksData={setSelectedTask}
            />
          </div>
        );
      case TASK_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS:
        return (
          <div className={"m-3"}>
            <TaskActivityPanel
              taskModel={selectedTask}
              showFilterContainerIcon={false}
              taskId={selectedTask?.getMongoDbId()}
              taskRunCount={selectedTask?.getData("run_count")}
              // status={}
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
        isLoading={isLoading || taskIsLoading}
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
