import React from "react";
import PropTypes from "prop-types";
import PipelineStepSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";

const NexusArtifactStepSelectInput = ({model, setModel, disabled, plan, stepId}) => {
  return (
    <PipelineStepSelectInput
      fieldName={"artifactStepId"}
      model={model}
      setModel={setModel}
      stepId={stepId}
      plan={plan}
      disabled={disabled || model?.getData("nexusToolConfigId") === ""}
    />
  );
};

NexusArtifactStepSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default NexusArtifactStepSelectInput;