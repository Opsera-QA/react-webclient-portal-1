import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const branchTypes = [
  {text: "Ant to Salesforce DX Branch Structure", value: "ant-to-sfdx"},
  {text: "Salesforce DX to Ant Branch Structure", value: "sfdx-to-ant"}
];

function GitBranchTypeSelectionInput({ fieldName, dataObject, setDataObject, placeholderText, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={branchTypes}
      placeholderText={placeholderText}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

GitBranchTypeSelectionInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  placeholderText: PropTypes.string,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

GitBranchTypeSelectionInput.defaultProps = {
  fieldName: "conversionType",
  placeholderText: "Select One",
};

export default GitBranchTypeSelectionInput;