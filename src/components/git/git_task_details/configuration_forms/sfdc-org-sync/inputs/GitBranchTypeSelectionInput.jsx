import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const branchTypes = [
  {name: "Ant to SFDX Branch structure", value: "ant-to-sfdx"},
  {name: "SFDX to Ant Branch Structure", value: "sfdx-to-ant"}
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