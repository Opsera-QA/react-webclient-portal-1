import React  from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const toolUsageTypes = [
  {text: "No Usage Type", value: ""},
  {text: "Pipeline", value: "pipeline"},
  {text: "Account", value: "account"},
  {text: "Repository", value: "repository"},
];

function ToolUsageTypeSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={toolUsageTypes}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
   />
  );
}

ToolUsageTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

ToolUsageTypeSelectInput.defaultProps = {
  fieldName: "usageType"
};

export default ToolUsageTypeSelectInput;