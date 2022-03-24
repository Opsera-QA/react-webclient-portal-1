import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../common/inputs/select/SelectInputBase";

function StepConfigurationTypeSelectInput({ dataObject, setDataObject, disabled, fieldName }) {

  const STEP_TYPES = [
    {
      name: "Build",
      value: "build",
    },
    {
      name: "Scan",
      value: "scan",
    },
    {
      name: "Deploy",
      value: "deploy",
    },
    {
      name: "Test",
      value: "test",
    },
  ];

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={STEP_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a Step Type"}
      disabled={disabled}
      busy={disabled}
    />
  );
}

StepConfigurationTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

StepConfigurationTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default StepConfigurationTypeSelectInput;
