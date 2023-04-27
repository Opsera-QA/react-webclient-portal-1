import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceMergeSyncTaskEnableJiraToggleInput(
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

SalesforceMergeSyncTaskEnableJiraToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceMergeSyncTaskEnableJiraToggleInput;
