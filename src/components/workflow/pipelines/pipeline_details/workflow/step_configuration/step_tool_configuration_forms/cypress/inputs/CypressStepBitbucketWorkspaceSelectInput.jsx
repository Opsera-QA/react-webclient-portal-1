import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function CypressStepBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("workspace", selectedOption?.key);
    newModel.setData("workspaceName", selectedOption?.name);
    newModel.setData("repoId", "");
    newModel.setData("projectId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("branch", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  if (model?.getData("service") !== "bitbucket") {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"repository"}
      gitToolId={model?.getData("gitToolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

CypressStepBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CypressStepBitbucketWorkspaceSelectInput;