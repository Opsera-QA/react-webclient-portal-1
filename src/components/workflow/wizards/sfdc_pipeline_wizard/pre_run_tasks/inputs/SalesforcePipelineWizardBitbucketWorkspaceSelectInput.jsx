import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

// TODO: This won't work until we add a helper function for replacing workspace
//  I just made this so I can remember what to do
export default function SalesforcePipelineWizardBitbucketWorkspaceSelectInput(
  {
    fieldName,
    model,
    setModel,
    pipeline,
    setPipeline,
    disabled,
  }) {
  const setDataFunction = (fieldName, value) => {
    // const updatedPipeline = salesforcePipelineHelper.updateBitbucketWorkspaceInSalesforcePipelineSteps(pipeline, value);
    // setPipeline({...updatedPipeline});
    model.setData("repository", "");
    model?.setData("repositoryName", "");
    model.setData("repoId", "");
    model.setData("projectId", "");
    model.setData("gitUrl", "");
    model.setData("sshUrl", "");
    model.setData("branch", "");
    model.setData("defaultBranch", "");
    model.setData("gitBranch", "");
    model.setData("workspace", value.key);
    model.setData("workspaceName", value.name);
    setModel({...model});
  };

  if (model.getData("isOrgToOrg") !== false) {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={fieldName}
      dataObject={model}
      setDataFunction={setDataFunction}
      gitToolId={model?.getData("gitToolId")}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
}

SalesforcePipelineWizardBitbucketWorkspaceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  disabled: PropTypes.bool,
};

SalesforcePipelineWizardBitbucketWorkspaceSelectInput.defaultProps = {
  fieldName: "workspace",
};
