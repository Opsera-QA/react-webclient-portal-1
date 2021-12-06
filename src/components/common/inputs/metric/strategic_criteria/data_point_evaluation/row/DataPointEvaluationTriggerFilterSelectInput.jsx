import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DATA_POINT_EVALUATION_TRIGGER_FILTER_SELECT_OPTIONS} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/dataPointEvaluationTrigger.types";

// TODO: If this is reused anywhere, make generic version in /list_of_values_input
function DataPointEvaluationTriggerFilterSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    updateRule,
  }) {
  // TODO: Should we just pass updateRule as setModel?
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setTextData(fieldName, selectedOption?.value);
    updateRule(newModel);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={DATA_POINT_EVALUATION_TRIGGER_FILTER_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

DataPointEvaluationTriggerFilterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  updateRule: PropTypes.func,
  disabled: PropTypes.bool,
};

DataPointEvaluationTriggerFilterSelectInput.defaultProps = {
  fieldName: "trigger_filter"
};

export default DataPointEvaluationTriggerFilterSelectInput;