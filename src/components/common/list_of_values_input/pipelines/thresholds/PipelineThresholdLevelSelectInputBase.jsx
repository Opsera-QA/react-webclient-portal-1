import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const THRESHOLD_LEVELS = [
  {text: "Critical", value: "critical"},
  {text: "High", value: "high"},
  {text: "Medium", value: "medium"},
  {text: "Low", value: "low"},
  {text: "Total", value: "total"},
];

function PipelineThresholdLevelSelectInputBase({ fieldName, model, setModel, isLoading, setDataFunction, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={THRESHOLD_LEVELS}
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={"Select Threshold Level"}
      valueField="value"
      textField="text"
      groupBy={"category"}
      disabled={disabled}
    />
  );
}

PipelineThresholdLevelSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  isLoading: PropTypes.bool,
};

PipelineThresholdLevelSelectInputBase.defaultProps = {
  fieldName: "level",
};

export default PipelineThresholdLevelSelectInputBase;