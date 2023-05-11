import PropTypes from "prop-types";
import React from "react";
import WorkflowOrchestrationProgressBarBase
  from "temp-library-components/fields/orchestration/progress/WorkflowOrchestrationProgressBarBase";
import useGetTaskRunMetricsById from "hooks/workflow/tasks/orchestration/metrics/useGetTaskRunMetricsById";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";

export default function TaskOrchestrationProgressBarBase(
  {
    taskModel,
    taskStartTime,
    className,
  }) {
  const {
    totalAverageDuration,
    lastRunDuration,
    lastFiveRunsDurationAverage,
  } = useGetTaskRunMetricsById(taskModel?.getMongoDbId(), taskModel?.getRunCount());
  const taskCompletionPercentage = orchestrationHelper.getTaskCompletionPercentage(
    taskStartTime,
    totalAverageDuration,
    lastRunDuration,
    lastFiveRunsDurationAverage
  );

  if (taskModel == null || !taskCompletionPercentage) {
    return null;
  }

  return (
    <WorkflowOrchestrationProgressBarBase
      className={className}
      completionPercentage={taskCompletionPercentage}
      status={taskModel?.getData("status")}
    />
  );
}

TaskOrchestrationProgressBarBase.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
  taskStartTime: PropTypes.string,
};
