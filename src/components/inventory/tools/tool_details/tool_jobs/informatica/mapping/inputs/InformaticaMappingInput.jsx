import React from "react";
import PropTypes from "prop-types";
import PipelineThresholdInputBase
  from "components/common/inputs/object/pipelines/threshhold/PipelineThresholdInputBase";

function InformaticaMappingInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    visible
  }) {
      
  if (!visible) {
    return null;
  }

  return (
    <PipelineThresholdInputBase
      fieldName={fieldName}
      model={model}
      className={"mb-3"}
      setModel={setModel}
      disabled={disabled}
    />
  );
}

InformaticaMappingInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

InformaticaMappingInput.defaultProps = {
  fieldName: "mapping",
  visible: true,
};

export default InformaticaMappingInput;
