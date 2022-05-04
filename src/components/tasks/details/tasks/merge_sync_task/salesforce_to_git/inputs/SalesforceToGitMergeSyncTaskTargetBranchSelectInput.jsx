import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SalesforceToGitMergeSyncTaskTargetBranchSelectInput({
  model,
  setModel,
  disabled,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("targetBranch", selectedOption);
    setModel({ ...newModel });
  };

  return (
    <GitBranchInput
      fieldName={"targetBranch"}
      service={model?.getData("service")}
      gitToolId={model?.getData("toolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("repoId")}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
}

SalesforceToGitMergeSyncTaskTargetBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceToGitMergeSyncTaskTargetBranchSelectInput;
