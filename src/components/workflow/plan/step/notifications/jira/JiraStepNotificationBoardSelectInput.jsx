import React from "react";
import PropTypes from "prop-types";
import JiraBoardSelectInput from "components/common/list_of_values_input/tools/jira/boards/JiraBoardSelectInput";

function JiraStepNotificationBoardSelectInput(
  {
    visible,
    jiraToolId,
    model,
    setModel,
    disabled,
    jiraProjectKey,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.id);
    newModel?.setData("jiraSprint", "");
    newModel?.setData("jiraParentTicket", "");
    setModel({...newModel});
  };

  return (
    <JiraBoardSelectInput
      fieldName={"jiraBoard"}
      jiraToolId={jiraToolId}
      jiraProjectKey={jiraProjectKey}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      visible={visible}
      disabled={disabled}
    />
  );
}

JiraStepNotificationBoardSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  jiraToolId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraProjectKey: PropTypes.string
};

export default JiraStepNotificationBoardSelectInput;