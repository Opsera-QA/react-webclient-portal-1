import React  from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function PipelineStepNotificationBooleanToggle(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      fieldName={fieldName}
    />
  );
}

PipelineStepNotificationBooleanToggle.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineStepNotificationBooleanToggle.defaultProps = {
  fieldName: "enabled"
};

export default PipelineStepNotificationBooleanToggle;