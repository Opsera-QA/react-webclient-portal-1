import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowStepToolIdentifierField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepToolIdentifierField";
import PipelineWorkflowStepIdField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepIdField";
import PipelineWorkflowStepChildPipelineField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepChildPipelineField";

export default function ChildPipelinePipelineStepWorkflowItemBody(
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
      <PipelineWorkflowStepChildPipelineField
        step={step}
      />
    </div>
  );
}

ChildPipelinePipelineStepWorkflowItemBody.propTypes = {
  pipeline: PropTypes.object,
  step: PropTypes.object,
  toolIdentifier: PropTypes.object,
};