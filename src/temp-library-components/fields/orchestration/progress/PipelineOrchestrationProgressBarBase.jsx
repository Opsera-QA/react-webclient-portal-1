import PropTypes from "prop-types";
import React from "react";
import WorkflowOrchestrationProgressBarBase
  from "temp-library-components/fields/orchestration/progress/WorkflowOrchestrationProgressBarBase";

export default function PipelineOrchestrationProgressBarBase(
  {
    pipelineModel,
    className,
  }) {
  if (pipelineModel == null) {
    return null;
  }

  return (
    <WorkflowOrchestrationProgressBarBase
      className={className}
      completionPercentage={pipelineModel?.getCompletionPercentage()}
      status={pipelineModel?.getPipelineState()}
    />
  );
}

PipelineOrchestrationProgressBarBase.propTypes = {
  pipelineModel: PropTypes.object,
  className: PropTypes.string,
};
