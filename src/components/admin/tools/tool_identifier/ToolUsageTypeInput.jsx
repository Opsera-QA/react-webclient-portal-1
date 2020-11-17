import React  from "react";
import PropTypes from "prop-types";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";

const usageTypes = [
  {text: "No Usage Type", value: ""},
  {text: "Pipeline", value: "pipeline"},
  {text: "Account", value: "account"},
  {text: "Repository", value: "repository"},
];

// TODO: If this is used elsewhere, move to common dto inputs
function ToolUsageTypeInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <DtoSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={usageTypes}
      disabled={disabled}
   />
  );
}

ToolUsageTypeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default ToolUsageTypeInput;