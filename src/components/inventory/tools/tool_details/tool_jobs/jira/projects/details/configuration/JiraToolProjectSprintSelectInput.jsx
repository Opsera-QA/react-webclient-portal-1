import React from "react";
import PropTypes from "prop-types";
import JiraSprintSelectInput from "components/common/list_of_values_input/tools/jira/sprint/JiraSprintSelectInput";

function JiraToolProjectSprintSelectInput(
  {
    model,
    setModel,
    disabled,
    jiraToolId,
    jiraBoard,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.id);
    newModel?.setDefaultValue("jiraParentTicket");
    setModel({...newModel});
  };

  return (
    <JiraSprintSelectInput
      fieldName={"jiraSprint"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      jiraToolId={jiraToolId}
      jiraBoard={jiraBoard}
      disabled={disabled}
    />
  );
}

JiraToolProjectSprintSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraBoard: PropTypes.string,
  disabled: PropTypes.bool,
};

export default JiraToolProjectSprintSelectInput;