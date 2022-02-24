import React from "react";
import PropTypes from "prop-types";
import PipelineStepSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";

function ArgoCdStepPipelineStepSelectInput(
  {
    model,
    setModel,
    fieldName,
    stepId,
    plan,
    className,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("dockerStepID", selectedOption?._id);
    newModel.setData("buildStepToolIdentifier", selectedOption?.tool?.tool_identifier);
    setModel({ ...newModel });
  };

  return (
    <PipelineStepSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      stepId={stepId}
      plan={plan}
      fieldName={fieldName}
      disabled={hasStringValue(model?.getData("applicationName")) !== true}
      className={className}
    />
  );
}

ArgoCdStepPipelineStepSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  stepId: PropTypes.string,
  plan: PropTypes.array,
};

ArgoCdStepPipelineStepSelectInput.defaultProps = {
  fieldName: "dockerStepID",
};

export default ArgoCdStepPipelineStepSelectInput;