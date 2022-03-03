import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJiraToolSelectInput
  from "components/common/list_of_values_input/tools/jira/RoleRestrictedJiraToolSelectInput";

function JiraStepNotificationJiraToolSelectInput(
  {
    visible,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("jiraToolId", selectedOption?._id);
    newModel.setData("jiraProject", "");
    newModel.setData("jiraSprint", "");
    newModel.setData("jiraParentTicket", "");
    newModel.setData("jiraPrimaryAssignee", "");
    newModel.setData("jiraSecondaryAssignees", []);
    newModel.setData("jiraBoard", "");
    newModel.setData("jiraPriority", "");
    newModel.setData("jiraOpenStep", "");
    newModel.setData("jiraClosureStep", "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedJiraToolSelectInput
      fieldName={"jiraToolId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      visible={visible}
      disabled={disabled || model?.getData("enabled") === false}
   />
  );
}

JiraStepNotificationJiraToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default JiraStepNotificationJiraToolSelectInput;