import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faGitAlt } from "@fortawesome/free-brands-svg-icons";
import PipelineExportToGitOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/PipelineExportToGitOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function PipelineWorkflowExportWorkflowButton(
  {
    pipeline,
    editingWorkflow,
    gitExportEnabled,
    workflowStatus,
    sourceRepositoryModel,
  }) {
  const {
    isOpseraAdministrator,
    userData,
    toastContext,
    isFreeTrial,
  } = useComponentStateReference();
  const tooltip =
    gitExportEnabled === true
      ? "Push the current version of this pipeline to your Git repository configured in the top level workflow settings for this pipeline."
      : "This feature allows users to push the current version of this pipeline to a configured git repository.  To use this feature go to workflow settings for this pipeline and enable Pipeline Git Revisions.";


  const launchGitExportOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineExportToGitOverlay
        pipeline={pipeline}
      />
    );
  };

  // TODO: Wire up role definitions from a model instead
  if (PipelineRoleHelper.canViewPipelineConfiguration(userData, pipeline) !== true) {
    return null;
  }

  if (isFreeTrial === true && isOpseraAdministrator !== true) {
    return (
      <VanityButtonBase
        className={"mr-1"}
        icon={faGitAlt}
        buttonSize={"sm"}
        tooltip={"In the main Opsera offering you can export the current version of the Pipeline's configuration to your Git repository."}
        variant={"outline-secondary"}
        normalText={"Export to Git"}
        disabled={true}
      />
    );
  }

  return (
    <VanityButtonBase
      className={"mr-1"}
      icon={faGitAlt}
      buttonSize={"sm"}
      tooltip={tooltip}
      variant={"outline-secondary"}
      normalText={"Export to Git"}
      disabled={(workflowStatus && workflowStatus !== "stopped") || gitExportEnabled !== true || sourceRepositoryModel?.isModelValid() !== true || editingWorkflow === true}
      onClickFunction={launchGitExportOverlay}
    />
  );
}

PipelineWorkflowExportWorkflowButton.propTypes = {
  pipeline: PropTypes.object,
  editingWorkflow: PropTypes.bool,
  gitExportEnabled: PropTypes.bool,
  workflowStatus: PropTypes.string,
  sourceRepositoryModel: PropTypes.object,
};