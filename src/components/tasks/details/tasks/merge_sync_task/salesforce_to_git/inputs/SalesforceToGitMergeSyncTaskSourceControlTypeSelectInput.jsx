import React from "react";
import PropTypes from "prop-types";
import GitBranchSourceControlManagementToolIdentifierSelectInput from "components/common/list_of_values_input/tools/source_control/GitBranchSourceControlManagementToolIdentifierSelectInput";

function SalesforceToGitMergeSyncTaskSourceControlTypeSelectInput({
  model,
  setModel,
  disabled,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("service", selectedOption?.value);
    newModel.setDefaultValue("toolId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    const newModel = { ...model };
    newModel.setDefaultValue("service");
    newModel.setDefaultValue("toolId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  return (
    <GitBranchSourceControlManagementToolIdentifierSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={"service"}
      disabled={disabled}
    />
  );
}

SalesforceToGitMergeSyncTaskSourceControlTypeSelectInput.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    disabled: PropTypes.bool,
};

export default SalesforceToGitMergeSyncTaskSourceControlTypeSelectInput;
