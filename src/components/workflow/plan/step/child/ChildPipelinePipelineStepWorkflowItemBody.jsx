import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowStepToolIdentifierField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepToolIdentifierField";
import PipelineWorkflowStepIdField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepIdField";
import PipelineWorkflowStepChildPipelineField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepChildPipelineField";

// TODO: Use the workflow item step field instead of hardcoding these for consistency,
//  wire up fields based on the tool identifier (pull through metadata based on dynamic field type set)
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