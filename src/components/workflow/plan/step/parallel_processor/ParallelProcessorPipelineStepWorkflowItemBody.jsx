import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowStepToolIdentifierField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepToolIdentifierField";
import PipelineWorkflowStepIdField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepIdField";
import PipelineWorkflowStepParallelPipelinesField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepParallelPipelinesField";

export default function ParallelProcessorPipelineStepWorkflowItemBody(
  {
    step,
    toolIdentifier,
  }) {
  if (step == null) {
    return null;
  }

  return (
    <div>
      <PipelineWorkflowStepIdField
        step={step}
      />
      <PipelineWorkflowStepToolIdentifierField
        toolIdentifier={toolIdentifier}
      />
      <PipelineWorkflowStepParallelPipelinesField
        step={step}
      />
    </div>
  );
}

ParallelProcessorPipelineStepWorkflowItemBody.propTypes = {
  pipeline: PropTypes.object,
  step: PropTypes.object,
  toolIdentifier: PropTypes.object,
};