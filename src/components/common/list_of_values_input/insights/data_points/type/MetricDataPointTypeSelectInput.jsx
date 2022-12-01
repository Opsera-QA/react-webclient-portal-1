import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { DATA_POINT_TYPE_OPTIONS } from "components/common/list_of_values_input/insights/data_points/type/dataPoint.types";

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