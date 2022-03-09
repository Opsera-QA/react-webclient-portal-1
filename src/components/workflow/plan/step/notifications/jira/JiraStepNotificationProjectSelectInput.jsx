import React from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";

function JiraStepNotificationProjectSelectInput(
  {
    jiraToolId,
    visible,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.key);
    newModel?.setDefaultValue("jiraSprint");
    newModel?.setDefaultValue("jiraParentTicket");
    newModel?.setDefaultValue("jiraPrimaryAssignee");
    newModel?.setDefaultValue("jiraBoard");
    newModel?.setDefaultValue("jiraSecondaryAssignees");
    newModel?.setDefaultValue("jiraOpenStep");
    newModel?.setDefaultValue("jiraClosureStep");
    setModel({...newModel});
  };

  return (
    <JiraProjectSelectInput
      fieldName={"jiraProject"}
      jiraToolId={jiraToolId}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      visible={visible}
    />
  );
}

JiraStepNotificationProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string
};

export default JiraStepNotificationProjectSelectInput;