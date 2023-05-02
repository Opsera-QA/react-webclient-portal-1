import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJiraToolSelectInput
  from "components/common/list_of_values_input/tools/jira/RoleRestrictedJiraToolSelectInput";

function MergeSyncTaskJiraToolSelectInput(
  {    
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("jiraToolId", selectedOption?._id);
    newModel.setDefaultValue("jiraProjectKey");
    newModel.setDefaultValue("jiraProjectName");
    newModel.setDefaultValue("jiraIssueId");
    newModel.setDefaultValue("jiraIssueIds");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    const newModel = {...model};
    newModel.setDefaultValue("jiraToolId");
    newModel.setDefaultValue("jiraProjectKey");
    newModel.setDefaultValue("jiraProjectName");
    newModel.setDefaultValue("jiraIssueId");
    newModel.setDefaultValue("jiraIssueIds");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedJiraToolSelectInput
      fieldName={"jiraToolId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}      
      disabled={disabled}
   />
  );
}

MergeSyncTaskJiraToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MergeSyncTaskJiraToolSelectInput;
