import React from "react";
import PropTypes from "prop-types";
import TaskActivityLogTreeTable from "components/tasks/details/TaskActivityLogTreeTable";

export default function FreeTrialLandingTaskWidgetTaskActivityLogsPanel(
  {
    selectedPipeline,
    className,
  }) {
  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={className}>
      <TaskActivityLogTreeTable
        pipeline={selectedPipeline}
        pipelineId={selectedPipeline?._id}
        pipelineRunCount={selectedPipeline?.workflow?.run_count}
      />
    </div>
  );
}

FreeTrialLandingTaskWidgetTaskActivityLogsPanel.propTypes = {
  selectedPipeline: PropTypes.object,
  className: PropTypes.string,
};