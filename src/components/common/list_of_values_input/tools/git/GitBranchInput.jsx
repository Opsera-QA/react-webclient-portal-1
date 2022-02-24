import React from "react";
import PropTypes from "prop-types";
import AzureDevOpsBranchSelectInput
  from "components/common/list_of_values_input/tools/azure/branches/AzureDevOpsBranchSelectInput";
import BitbucketBranchSelectInput
  from "components/common/list_of_values_input/tools/bitbucket/branches/BitbucketBranchSelectInput";
import GithubBranchSelectInput
  from "components/common/list_of_values_input/tools/github/branches/GithubBranchSelectInput";
import GitlabBranchSelectInput
  from "components/common/list_of_values_input/tools/gitlab/branches/GitlabBranchSelectInput";

// TODO: Rework this into multiple inputs, rename BranchSelectInputBase
function GitBranchInput(
  {
    service,
    gitToolId,
    repoId,
    workspace,
    visible,
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
  }) {
  if (visible === false) {
    return <></>;
  }

  if (service === "azure-devops") {
    return (
      <AzureDevOpsBranchSelectInput
        toolId={gitToolId}
        repositoryId={repoId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
      />
    );
  }

  if (service === "bitbucket") {
    return (
      <BitbucketBranchSelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        workspace={workspace}
        repositoryId={repoId}
      />
    );
  }

  if (service === "github") {
    return (
      <GithubBranchSelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        repositoryId={repoId}
      />
    );
  }

  if (service === "gitlab") {
    return (
      <GitlabBranchSelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        repositoryId={repoId}
      />
    );
  }

  return (
    <></>
  );
}

GitBranchInput.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  repoId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default GitBranchInput;
