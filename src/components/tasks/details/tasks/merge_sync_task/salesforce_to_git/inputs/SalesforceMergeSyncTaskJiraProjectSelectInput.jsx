import React from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";

function SalesforceMergeSyncTaskJiraProjectSelectInput(
  {
    model,
    setModel,
    jiraToolId,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.key);
    newModel.setDefaultValue("jiraIssueId");    
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    const newModel = {...model};    
    newModel.setDefaultValue("jiraProjectKey");
    newModel.setDefaultValue("jiraIssueId");
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

SalesforceMergeSyncTaskJiraProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string,
};

export default SalesforceMergeSyncTaskJiraProjectSelectInput;
