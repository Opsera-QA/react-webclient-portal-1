import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  DATA_POINT_TYPE_LABELS,
  DATA_POINT_TYPES
} from "components/common/list_of_values_input/insights/data_points/type/dataPoint.types";

export const DATA_POINT_TYPE_OPTIONS = [
  {text: DATA_POINT_TYPE_LABELS.PERCENTAGE, value: DATA_POINT_TYPES.PERCENTAGE},
  {text: DATA_POINT_TYPE_LABELS.NUMBER, value: DATA_POINT_TYPES.NUMBER},
  {text: DATA_POINT_TYPE_LABELS.LETTER_GRADE, value: DATA_POINT_TYPES.LETTER_GRADE},
];

function MetricDataPointTypeSelectInput({ fieldName, model, setModel, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={DATA_POINT_TYPE_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

MetricDataPointTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MetricDataPointTypeSelectInput;