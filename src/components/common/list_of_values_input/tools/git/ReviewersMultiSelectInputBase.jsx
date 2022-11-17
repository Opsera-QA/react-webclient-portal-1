import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "../../../inputs/text/TextInputBase";
import AzureReviewersMultiSelectInput from "../azure/reviewers/AzureReviewersMultiSelectInput";
import BitbucketReviewersMultiSelectInput from "../bitbucket/reviewers/BitbucketReviewersMultiSelectInput";
import GithubReviewersMultiSelectInput from "../github/reviewers/GithubReviewersMultiSelectInput";
import GitlabReviewersMultiSelectInput from "../gitlab/reviewers/GitlabReviewersMultiSelectInput";

function ReviewersMultiSelectInputBase({
  service,
  gitToolId,
  repoId,
  projectId,
  workspace,
  repository,
  visible,
  fieldName,
  dataObject,
  setDataObject,
  setDataFunction,
  clearDataFunction,
  disabled,
  multi,
}) {
  if (visible === false) {
    return <></>;
  }

  if (service === "azure-devops") {
    return (
      <AzureReviewersMultiSelectInput
        toolId={gitToolId}
        projectId={projectId}
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
      <BitbucketReviewersMultiSelectInput
        toolId={gitToolId}
        multi={multi}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
        workspace={workspace}
        repositoryId={repoId}
        repository={repository}
      />
    );
  }

  if (service === "github") {
    return (
      <GithubReviewersMultiSelectInput
        toolId={gitToolId}
        multi={multi}
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
      <GitlabReviewersMultiSelectInput
        toolId={gitToolId}
        multi={multi}
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

  return <></>;
}

ReviewersMultiSelectInputBase.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  repoId: PropTypes.string,
  projectId: PropTypes.string,
  workspace: PropTypes.string,
  repository: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  multi: PropTypes.bool,
};

ReviewersMultiSelectInputBase.defaultProps = {
  multi: false,
};

export default ReviewersMultiSelectInputBase;
