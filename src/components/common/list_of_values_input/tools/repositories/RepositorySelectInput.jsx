import React from "react";
import PropTypes from "prop-types";
import AzureDevOpsRepositorySelectInput
  from "components/common/list_of_values_input/tools/azure/repositories/AzureDevOpsRepositorySelectInput";
import BitbucketRepositorySelectInput
  from "components/common/list_of_values_input/tools/bitbucket/repositories/BitbucketRepositorySelectInput";
import GithubRepositorySelectInput
  from "components/common/list_of_values_input/tools/github/repositories/GithubRepositorySelectInput";
import GitlabRepositorySelectInput
  from "components/common/list_of_values_input/tools/gitlab/repositories/GitlabRepositorySelectInput";
import GithubMonoRepositorySelectInput from "../github/repositories/GithubMonoRepositorySelectInput";

// TODO: Clean up this component. Change "gitToolId" to "toolId", make validateSavedData default to true after all use cases are tested.
// TODO: Separate out into multiple inputs, make this RepositorySelectInputBase
function RepositorySelectInput(
  {
    service,
    gitToolId,
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
      <AzureDevOpsRepositorySelectInput
        toolId={gitToolId}
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
      <BitbucketRepositorySelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        workspace={workspace}
      />
    );
  }

  if (service === "github") {
    return (
      <GithubRepositorySelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
      />
    );
  }

  if (service === "gitlab") {
    return (
      <GitlabRepositorySelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
      />
    );
  }
  
  if (service === "github-deploykey") {
    return (
        <GithubMonoRepositorySelectInput
            toolId={gitToolId}
            model={dataObject}
            setModel={setDataObject}
            setDataFunction={setDataFunction}
            fieldName={fieldName}
            disabled={disabled}
            clearDataFunction={clearDataFunction}
        />
    );
  }

  return (
    <></>
  );
}

RepositorySelectInput.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  validateSavedData: PropTypes.bool,
  placeholderText: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

RepositorySelectInput.defaultProps = {
  placeholderText: "Select Repository",
  valueField: "name",
  textField: "name",
};

export default RepositorySelectInput;
