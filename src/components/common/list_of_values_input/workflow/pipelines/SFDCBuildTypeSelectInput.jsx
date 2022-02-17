import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const sfdcBuildTypeArray = [
  {
    "name": "Ant (Metadata Format)",
    "value": "ant",
  },
  {
    "name": "Salesforce DX (Source Format)",
    "value": "sfdx",
  },
];

function SFDCBuildTypeSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={sfdcBuildTypeArray}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

SFDCBuildTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool
};

export default SFDCBuildTypeSelectInput;