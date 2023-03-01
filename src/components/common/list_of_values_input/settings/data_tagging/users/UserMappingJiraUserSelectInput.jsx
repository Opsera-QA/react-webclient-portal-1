import React from "react";
import PropTypes from "prop-types";
import JiraProjectUserSelectInput
  from "components/common/list_of_values_input/tools/jira/users/JiraProjectUserSelectInput";

export default function UserMappingJiraUserSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData("tool_user_id", selectedOption?.accountId);
    model.setData("tool_user_email", selectedOption?.emailAddress);
    setModel({...model});
  };

  return (
    <JiraProjectUserSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      jiraToolId={model?.getData("tool_id")}
      jiraProject={model?.getData("tool_user_prop")}
      disabled={disabled}
    />
  );
}

UserMappingJiraUserSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

UserMappingJiraUserSelectInput.defaultProps = {
  fieldName: "tool_user_id",
};
