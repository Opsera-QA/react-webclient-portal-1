import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function PipelineSourceRepositoryBitbucketWorkspaceSelectInput({className, fieldName, model, setModel, disabled, accountId, visible}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("workspace", selectedOption?.key);
    newModel.setData("workspaceName", selectedOption?.name);
    newModel.setData("repository", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("branch", "");
    newModel.setData("secondary_branches", []);
    setModel({...newModel});
  };

  if (visible === false) {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      gitToolId={accountId}
      fieldName={fieldName}
      placeholderText={"Select Workspace"}
      configurationRequired={true}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled || accountId === "" || accountId == null}
      className={className}
    />
  );
}

PipelineSourceRepositoryBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  accountId: PropTypes.string,
  visible: PropTypes.bool,
};

PipelineSourceRepositoryBitbucketWorkspaceSelectInput.defaultProps = {
  fieldName: "workspace",
};

export default PipelineSourceRepositoryBitbucketWorkspaceSelectInput;