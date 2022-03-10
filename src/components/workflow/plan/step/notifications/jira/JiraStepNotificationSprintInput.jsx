import React from "react";
import PropTypes from "prop-types";
import JiraSprintSelectInput from "components/common/list_of_values_input/tools/jira/sprint/JiraSprintSelectInput";

function JiraStepNotificationSprintInput(
  {
    visible,
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

  if (!visible) {
    return <></>;
  }

  return (
    <JiraSprintSelectInput
      fieldName={"jiraSprint"}
      jiraToolId={jiraToolId}
      jiraBoard={jiraBoard}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      visible={visible}
      disabled={disabled}
    />
  );
}

JiraStepNotificationSprintInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraBoard: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

JiraStepNotificationSprintInput.defaultProps = {
  visible: true
};

export default JiraStepNotificationSprintInput;