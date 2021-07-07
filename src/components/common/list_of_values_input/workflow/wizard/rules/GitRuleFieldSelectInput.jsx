import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleFields = [
  {value: "commitAction", text: "Commit Action"},
  // {value: "commitId", text: "Commit ID"},
  {value: "committedFile", text: "File Name"},
  {value: "componentName", text: "Component Name"},
  // {value: "committedTime", text: "Commit Time"}, // TODO: For future release
  {value: "committedBy", text: "Committed By"},
];

function GitRuleFieldSelectInput({fieldName, className, dataObject, setDataObject, disabled, showLabel}) {
  const setDataFunction = (fieldName, newValue) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newValue["value"]);
    newDataObject.setData("values", []);
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={ruleFields}
      placeholderText={"Select a Field"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

GitRuleFieldSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

GitRuleFieldSelectInput.defaultProps = {
  fieldName: "field",
};

export default GitRuleFieldSelectInput;