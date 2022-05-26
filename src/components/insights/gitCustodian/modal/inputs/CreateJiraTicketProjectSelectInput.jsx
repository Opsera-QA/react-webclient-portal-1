import React from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";

function CreateJiraTicketProjectSelectInput(
  {
    jiraToolId,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.key);
    newModel?.setData("issueTypeId", selectedOption?.id);
    setModel({...newModel});
  };

  return (
    <JiraProjectSelectInput
      fieldName={"projectKey"}
      jiraToolId={jiraToolId}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

CreateJiraTicketProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string
};

export default CreateJiraTicketProjectSelectInput;
