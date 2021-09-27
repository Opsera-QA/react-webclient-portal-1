import React from 'react';
import PropTypes from 'prop-types';
import ScmToolIdentifierSelectInput
  from "components/common/list_of_values_input/tools/source_control/ScmToolIdentifierSelectInput";

function BranchToBranchScmTypeSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("service", selectedOption?.value);
    newModel.setData("gitCredential", "");
    newModel.setData("gitToolId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("repository", "");
    newModel.setData("projectId", "");
    newModel.setData("gitBranch", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("workspaceName", "");
    newModel.setData("sourceBranch", "");
    newModel.setData("autoApprove", false);
    newModel.setData("reviewers", []);
    newModel.setData("reviewerNames", []);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("service", "");
    newModel.setData("gitCredential", "");
    newModel.setData("gitToolId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("repository", "");
    newModel.setData("projectId", "");
    newModel.setData("gitBranch", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("workspaceName", "");
    newModel.setData("sourceBranch", "");
    newModel.setData("autoApprove", false);
    newModel.setData("reviewers", []);
    newModel.setData("reviewerNames", []);
    setModel({...newModel});
  };

  return (
    <ScmToolIdentifierSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={"service"}
      disabled={disabled}
    />
  );
}

BranchToBranchScmTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BranchToBranchScmTypeSelectInput;