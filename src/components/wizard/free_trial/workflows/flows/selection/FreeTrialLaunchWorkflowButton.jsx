import React from "react";
import PropTypes from "prop-types";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { Button } from "react-bootstrap";
import { workspaceConstants } from "components/workspace/workspace.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineStartWizard from "components/workflow/pipelines/pipeline_details/PipelineStartWizard";

// TODO: This will need more work when we add more flows.
export default function FreeTrialLaunchWorkflowButton(
  {
    className,
    workspaceItem,
  }) {
  const { toastContext } = useComponentStateReference();

  const launchWorkflow = () => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        // toastContext.showOverlayPanel(
        //   <PipelineStartWizard
        //     pipelineType={pipelineType}
        //     pipelineOrientation={pipelineOrientation}
        //     pipelineId={pipelineId}
        //     pipeline={pipeline}
        //     handleClose={handlePipelineStartWizardClose}
        //     handlePipelineWizardRequest={handlePipelineWizardRequest}
        //   />,
        // );
        break;
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        toastContext.showOverlayPanel(
          <PipelineStartWizard
            pipelineType={"s"}
            pipelineOrientation={pipelineOrientation}
            pipelineId={pipelineId}
            pipeline={workspaceItem}
            handleClose={handlePipelineStartWizardClose}
            handlePipelineWizardRequest={handlePipelineWizardRequest}
          />,
        );
        break;
    }

  };

  return (
    <div className={className}>
      <Button
        variant={"success"}
        disabled={workspaceItem == null}
        onClick={launchWorkflow}
      >
          <span>
            <IconBase
              icon={faArrowRight}
              className={"mr-2"}
            />
            Launch Workflow
          </span>
      </Button>
    </div>
  );
}

FreeTrialLaunchWorkflowButton.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  workspaceItem: PropTypes.object,
};


