import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import PipelineSourceRepositoryToolIdentifierSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryToolIdentifierSelectInput";
import PipelineSourceRepositoryToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryToolSelectInput";
import PipelineSourceRepositoryBitbucketWorkspaceSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryBitbucketWorkspaceSelectInput";
import PipelineSourceRepositorySelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySelectInput";
import PipelineSourceRepositoryPrimaryBranchSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryPrimaryBranchSelectInput";
import PipelineSourceRepositorySecondaryBranchesMultiSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySecondaryBranchesMultiSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";

export default function PipelineSourceRepositoryRepositoryInputPanel(
  {
    className,
    sourceRepositoryModel,
    setSourceRepositoryModel,
  }) {
  const getRepositoryInfoMessage = () => {
    const service = sourceRepositoryModel?.getData("service");
    const workspace = sourceRepositoryModel?.getData("workspace");
    const repository = sourceRepositoryModel?.getData("repoId");
    const branch = sourceRepositoryModel?.getData("branch");

    if (
      hasStringValue(service) === true
      && (service !== "bitbucket" || hasStringValue(workspace) === true)
      && hasStringValue(repository) === true
      && hasStringValue(branch) === true
    ) {
      return (
        <InfoMessageFieldBase
          message={`
          Please note, individual pipeline steps still have their own Git Repo settings based
          on the function of that step.  This value does NOT override those.
        `}
          className={"mt-3"}
        />
      );
    }
  };

  return (
    <div className={className}>
      <H5FieldSubHeader
        className={"text-muted"}
        subheaderText={"Repository"}
      />
      <PipelineSourceRepositoryToolIdentifierSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
      />
      <PipelineSourceRepositoryToolSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        sourceRepositoryToolIdentifier={sourceRepositoryModel?.getData("service")}
      />
      <PipelineSourceRepositoryBitbucketWorkspaceSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        accountId={sourceRepositoryModel?.getData("accountId")}
        visible={sourceRepositoryModel?.getData("service") === "bitbucket"}
      />
      <PipelineSourceRepositorySelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        service={sourceRepositoryModel?.getData("service")}
        accountId={sourceRepositoryModel?.getData("accountId")}
        workspace={sourceRepositoryModel?.getData("workspace")}
        visible={
          sourceRepositoryModel?.getData("service") != null
          && sourceRepositoryModel?.getData("accountId") != null
          && (sourceRepositoryModel?.getData("service") === "bitbucket" ? sourceRepositoryModel?.getData("workspace") != null && sourceRepositoryModel?.getData("workspace").length > 0 : true)}
      />
      <PipelineSourceRepositoryPrimaryBranchSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
      />
      <PipelineSourceRepositorySecondaryBranchesMultiSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        primaryBranch={sourceRepositoryModel?.getData("branch")}
      />
      {getRepositoryInfoMessage()}
    </div>
  );
}

PipelineSourceRepositoryRepositoryInputPanel.propTypes = {
  sourceRepositoryModel: PropTypes.object,
  setSourceRepositoryModel: PropTypes.func,
  className: PropTypes.string,
};
