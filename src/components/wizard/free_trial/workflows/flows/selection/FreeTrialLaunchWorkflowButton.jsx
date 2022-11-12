import React from "react";
import PropTypes from "prop-types";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { Button } from "react-bootstrap";
import { workspaceConstants } from "components/workspace/workspace.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import SalesforcePipelineWizardOverlay
  from "components/workflow/wizards/sfdc_pipeline_wizard/SalesforcePipelineWizardOverlay";
import SalesforceOrganizationSyncTaskWizardOverlay from "components/tasks/wizard/organization_sync/SalesforceOrganizationSyncTaskWizardOverlay";
import { TASK_TYPES } from "components/tasks/task.types";
import SalesforceToGitMergeSyncTaskWizardOverlay
  from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardOverlay";
import RunTaskOverlay from "components/tasks/details/RunTaskOverlay";
import modelHelpers from "components/common/model/modelHelpers";
import taskMetadata from "components/tasks/details/tasks/task-metadata";

// TODO: This will need more work when we add more flows.
export default function FreeTrialLaunchWorkflowButton(
  {
    className,
    workspaceItem,
    setWorkspaceItem,
    workspaceType,
  }) {
  const { toastContext } = useComponentStateReference();

  const launchWorkflow = () => {
    switch (workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        switch (workspaceItem?.type) {
          case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
            toastContext.showOverlayPanel(
              <SalesforceToGitMergeSyncTaskWizardOverlay
                taskModel={modelHelpers.parseObjectIntoModel(workspaceItem, taskMetadata)}
              />,
            );
            break;
          case TASK_TYPES.SYNC_SALESFORCE_REPO:
            toastContext.showOverlayPanel(
              <SalesforceOrganizationSyncTaskWizardOverlay
                taskModel={modelHelpers.parseObjectIntoModel(workspaceItem, taskMetadata)}
              />,
            );
            break;
          default:
            toastContext.showOverlayPanel(
              <RunTaskOverlay
                taskModel={workspaceItem}
                setTaskModel={setWorkspaceItem}
              />
            );
        }
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

  const getButtonText = () => {
    switch (workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return "Start Task Now!";
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return "Start Pipeline Now!";
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
            {getButtonText()}
          </span>
      </Button>
    </div>
  );
}

FreeTrialLaunchWorkflowButton.propTypes = {
  className: PropTypes.string,
  workspaceItem: PropTypes.object,
  setWorkspaceItem: PropTypes.func,
  workspaceType: PropTypes.string,
};


