import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: When all are supported, move to a common spot for both this and ProjectMappingToolIdtentiferSelectInput
const TOOL_TYPES = [
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  // { value: "bitbucket", label: "Bitbucket" },
  { value: "jira", label: "Jira" },
  // { value: "sonar", label: "Sonar" }, DISABLING SONAR FOR NOW
];


export default function UserMappingToolIdentifierSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = async (fieldName, selectedOption) => {
    model.setData(fieldName, selectedOption?.value);
    // TODO: Use setDefaultValue. Left in for safety and to minimize changes
    model.setData("tool_id", "");
    model.setData("tool_prop", "");
    model.setData("tool_user_prop", "");
    model.setData("tool_user_id", "");
    model.setData("tool_user_email", "");
    setModel({...model});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={TOOL_TYPES}
      valueField="value"
      textField="label"
      disabled={disabled}
    />
  );
}

UserMappingToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

UserMappingToolIdentifierSelectInput.defaultProps = {
  fieldName: "tool_identifier"
};
