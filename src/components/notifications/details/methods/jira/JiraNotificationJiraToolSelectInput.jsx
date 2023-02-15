import React from "react";
import PropTypes from "prop-types";
import JiraPriorityInput
  from "components/notifications/details/methods/jira/JiraPriorityInput";
import JiraPipelineNotificationJiraToolProjectSelectInput
  from "components/notifications/details/methods/jira/JiraPipelineNotificationJiraToolProjectSelectInput";
import RoleRestrictedJiraToolSelectInput
  from "components/common/list_of_values_input/tools/jira/RoleRestrictedJiraToolSelectInput";

function JiraNotificationJiraToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("jiraToolId", selectedOption?._id);
    newDataObject.setData("toolProjectId", "");
    newDataObject.setData("jiraPrimaryAssignee", "");
    newDataObject.setData("jiraSecondaryAssignees", []);
    setModel({...newDataObject});
  };

  return (
    <>
      <RoleRestrictedJiraToolSelectInput
        fieldName={"jiraToolId"}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        disabled={disabled || model?.getData("enabled") === false}
      />
      <JiraPriorityInput dataObject={model} setDataObject={setModel} jiraToolId={model?.getData("jiraToolId")} />
      <JiraPipelineNotificationJiraToolProjectSelectInput
        model={model}
        setModel={setModel}
        jiraToolId={model?.getData("jiraToolId")}
      />
    </>
  );
}

JiraNotificationJiraToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JiraNotificationJiraToolSelectInput;