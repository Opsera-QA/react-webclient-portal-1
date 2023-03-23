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
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import {useHistory} from "react-router-dom";

// TODO: This will need more work when we add more flows.
export default function PortalRouteToWorkflowButton(
    {
        className,
        workspaceItem,
        setWorkspaceItem,
        workspaceType,
        handleClose,
        size,
        style
    }) {
    const { toastContext } = useComponentStateReference();
    const history = useHistory();

    const launchWorkflow = () => {
        handleClose();
        history.push(`/task/details/${workspaceItem?._id}`);
    };

    return (
        <div className={className}>
            <Button
                variant={"success"}
                size={size}
                style={style}
                disabled={workspaceItem == null}
                onClick={launchWorkflow}
            >
          <span>
            <IconBase
                icon={faArrowRight}
                className={"mr-2"}
            />
              View Task
          </span>
            </Button>
        </div>
    );
}

PortalRouteToWorkflowButton.propTypes = {
    className: PropTypes.string,
    workspaceItem: PropTypes.object,
    setWorkspaceItem: PropTypes.func,
    handleClose: PropTypes.func,
    workspaceType: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.string,
};


