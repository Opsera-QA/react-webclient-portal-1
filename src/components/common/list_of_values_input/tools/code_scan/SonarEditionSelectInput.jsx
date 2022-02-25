import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SONAR_TOOL_IDENTIFIERS = [
  {
    text: "Community Edition",
    value: "community",
  },
  {
    text: "Developer Edition",
    value: "developer",
  },
  {
    text: "Enterprise Edition",
    value: "enterprise",
  },
  {
    text: "Data Center",
    value: "data_center",
  }
];

function SonarEditionSelectInput({dataObject, setDataObject, fieldName, disabled, setDataFunction, clearDataFunction}) {
  return (
    <SelectInputBase
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      textField={"text"}
      valueField={"value"}
      dataObject={dataObject}
      clearDataFunction={clearDataFunction}
      selectOptions={SONAR_TOOL_IDENTIFIERS}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

SonarEditionSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default SonarEditionSelectInput;