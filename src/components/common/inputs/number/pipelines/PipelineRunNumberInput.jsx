import React from "react";
import PropTypes from "prop-types";
import NumberPickerInputBase from "components/common/inputs/number/picker/base/NumberPickerInputBase";

function PipelineRunNumberInput({ model, setModel, fieldName, setDataFunction, maximumRunCount, className, showLabel, disabled}) {
  return (
    <NumberPickerInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      maximum={maximumRunCount}
      minimum={maximumRunCount > 0 ? 1 : 0}
      showLabel={showLabel}
      disabled={disabled || maximumRunCount === 0}
    />
  );
}

PipelineRunNumberInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  maximumRunCount: PropTypes.number,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
};

PipelineRunNumberInput.defaultProps = {
  maximumRunCount: 0,
  fieldName: "selectedRunNumber",
};

export default PipelineRunNumberInput;


