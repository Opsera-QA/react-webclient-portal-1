import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function GitToGitMergeSyncTaskEnableJiraToggleInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel?.setData(fieldName, newValue);    
    newModel?.setDefaultValue("jiraToolId");
    newModel?.setDefaultValue("jiraProjectKey");
    newModel?.setDefaultValue("jiraIssueId");
    newModel?.setDefaultValue("jiraIssueIds");
    newModel?.setDefaultValue("jiraProjectName");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      fieldName={"enableJiraIntegration"}
      disabled={disabled}
    />
  );
}

GitToGitMergeSyncTaskEnableJiraToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitMergeSyncTaskEnableJiraToggleInput;
