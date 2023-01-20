import React from "react";
import PropTypes from "prop-types";
import PipelineThresholdInputBase
  from "components/common/inputs/object/pipelines/threshhold/PipelineThresholdInputBase";

function FortifyStepThresholdInput(
  {
    model,
    setModel,
    disabled,
  }) {
      
  return (
    <PipelineThresholdInputBase
      fieldName={"thresholdVulnerability"}
      model={model}
      className={"mb-3"}
      setModel={setModel}
      disabled={disabled}
    />
  );
}

FortifyStepThresholdInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FortifyStepThresholdInput;
