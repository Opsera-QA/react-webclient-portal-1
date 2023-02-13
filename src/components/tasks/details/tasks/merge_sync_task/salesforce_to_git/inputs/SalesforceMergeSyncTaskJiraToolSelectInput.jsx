import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJiraToolSelectInput
  from "components/common/list_of_values_input/tools/jira/RoleRestrictedJiraToolSelectInput";

function SalesforceMergeSyncTaskJiraToolSelectInput(
  {    
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("jiraToolId", selectedOption?._id);
    newModel.setDefaultValue("jiraProjectKey");
    newModel.setDefaultValue("jiraIssueId");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    const newModel = {...model};
    newModel.setDefaultValue("jiraToolId");
    newModel.setDefaultValue("jiraProjectKey");
    newModel.setDefaultValue("jiraIssueId");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedJiraToolSelectInput
      fieldName={"jiraToolId"}
      model={model}
      setModel={setModel}
      setDefaultValueFunction={setDataFunction}
      clearDataFunction={clearDataFunction}      
      disabled={disabled}
   />
  );
}

SalesforceMergeSyncTaskJiraToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceMergeSyncTaskJiraToolSelectInput;
