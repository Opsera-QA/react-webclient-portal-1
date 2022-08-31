import React from "react";
import PropTypes from "prop-types";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";

export default function FreeTrialLandingPipelineWidgetPipelineActivityLogsPanel(
  {
    selectedPipeline,
    className,
  }) {
  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={className}>
      <PipelineActivityLogTreeTable
        pipeline={selectedPipeline}
        pipelineId={selectedPipeline?._id}
        pipelineRunCount={selectedPipeline?.workflow?.run_count}
      />
    </div>
  );
}

FreeTrialLandingPipelineWidgetPipelineActivityLogsPanel.propTypes = {
  selectedPipeline: PropTypes.object,
  className: PropTypes.string,
};