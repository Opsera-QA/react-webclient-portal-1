import React from "react";
import PropTypes from "prop-types";
import AzureDevOpsBranchMultiSelectInput
  from "components/common/list_of_values_input/tools/azure/branches/AzureDevOpsBranchMultiSelectInput";
import BitbucketBranchMultiSelectInput
  from "components/common/list_of_values_input/tools/bitbucket/branches/BitbucketBranchMultiSelectInput";
import GithubBranchMultiSelectInput
  from "components/common/list_of_values_input/tools/github/branches/GithubBranchMultiSelectInput";
import GitlabBranchMutliSelectInput
  from "components/common/list_of_values_input/tools/gitlab/branches/GitlabBranchMutliSelectInput";

function RepositoryBranchMultiSelectInputBase(
  {
    toolIdentifier,
    toolId,
    repoId,
    workspace,
    visible,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
  }) {
  if (visible === false) {
    return <></>;
  }
  if (toolIdentifier === "azure-devops") {
    return (
      <AzureDevOpsBranchMultiSelectInput
        toolId={toolId}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
      />
    );
  }

  if (toolIdentifier === "bitbucket") {
    return (
      <BitbucketBranchMultiSelectInput
        toolId={toolId}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        workspace={workspace}
        repositoryId={repoId}
      />
    );
  }

  if (toolIdentifier === "github") {
    return (
      <GithubBranchMultiSelectInput
        toolId={toolId}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        repositoryId={repoId}
      />
    );
  }

  if (toolIdentifier === "gitlab") {
    return (
      <GitlabBranchMutliSelectInput
        toolId={toolId}
        model={model}
        setModel={setModel}
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

RepositoryBranchMultiSelectInputBase.propTypes = {
  toolIdentifier: PropTypes.string,
  toolId: PropTypes.string,
  repoId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default RepositoryBranchMultiSelectInputBase;
