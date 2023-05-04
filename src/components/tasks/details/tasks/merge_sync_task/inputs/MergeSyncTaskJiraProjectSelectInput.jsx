import React from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";

function MergeSyncTaskJiraProjectSelectInput(
  {
    model,
    setModel,
    jiraToolId,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.key);
    newModel?.setData("jiraProjectName", selectedOption?.name);
    newModel.setDefaultValue("jiraIssueId");
    newModel.setDefaultValue("jiraIssueIds");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    const newModel = {...model};    
    newModel.setDefaultValue("jiraProjectKey");
    newModel.setDefaultValue("jiraProjectName");
    newModel.setDefaultValue("jiraIssueId");
    newModel.setDefaultValue("jiraIssueIds");
    setModel({...newModel});
  };

  return (
    <JiraProjectSelectInput
      fieldName={"jiraProjectKey"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      jiraToolId={jiraToolId}
      disabled={disabled}
    />
  );
}

MergeSyncTaskJiraProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string,
};

export default MergeSyncTaskJiraProjectSelectInput;