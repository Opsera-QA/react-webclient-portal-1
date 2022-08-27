import React from "react";
import PropTypes from "prop-types";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { Button } from "react-bootstrap";
import { workspaceConstants } from "components/workspace/workspace.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import SalesforcePipelineWizardOverlay
  from "components/workflow/wizards/sfdc_pipeline_wizard/SalesforcePipelineWizardOverlay";
import SalesforceTaskWizardOverlay from "components/tasks/wizard/organization_sync/SalesforceTaskWizardOverlay";
import modelHelpers from "components/common/model/modelHelpers";

// TODO: This will need more work when we add more flows.
export default function FreeTrialLaunchWorkflowButton(
  {
    className,
    workspaceItem,
    taskMetadata,
  }) {
  const { toastContext } = useComponentStateReference();

  const launchWorkflow = () => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        toastContext.showOverlayPanel(
          <SalesforceTaskWizardOverlay
            gitTasksData={modelHelpers.parseObjectIntoModel(workspaceItem, taskMetadata)}
          />
        );
        break;
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        toastContext.showOverlayPanel(
          <SalesforcePipelineWizardOverlay
            pipeline={workspaceItem}
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
  className: PropTypes.string,
  workspaceItem: PropTypes.object,
  taskMetadata: PropTypes.object,
};


