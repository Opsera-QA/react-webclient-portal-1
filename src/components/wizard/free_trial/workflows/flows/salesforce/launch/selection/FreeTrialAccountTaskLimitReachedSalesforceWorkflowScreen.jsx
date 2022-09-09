import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreateSalesforceWorkflowWizard
  , {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isTaskTypeOfCategory, TASK_TYPE_CATEGORIES, TASK_TYPES } from "components/tasks/task.types";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import FreeTrialLaunchSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/FreeTrialLaunchSalesforceWorkflowScreen";
import FreeTrialSelectSalesforceWorkflowOptionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/selection/FreeTrialSelectSalesforceWorkflowOptionScreen";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { faWarning } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import FreeTrialWorkflowItemSelectionCardView
  from "components/wizard/free_trial/workflows/flows/selection/card/FreeTrialWorkflowItemSelectionCardView";
import SalesforcePipelineWizardOverlay
  from "components/workflow/wizards/sfdc_pipeline_wizard/SalesforcePipelineWizardOverlay";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import SalesforceToGitMergeSyncTaskWizardOverlay
  from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardOverlay";
import SalesforceOrganizationSyncTaskWizardOverlay
  from "components/tasks/wizard/organization_sync/SalesforceOrganizationSyncTaskWizardOverlay";
import modelHelpers from "components/common/model/modelHelpers";
import tasksMetadata from "components/tasks/details/tasks/task-metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function FreeTrialAccountTaskLimitReachedSalesforceWorkflowScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    setSelectedFlow,
    selectedFlow,
    taskCounts,
    isAccountWhitelisted,
    className,
  }) {
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const currentCount = DataParsingHelper.parseInteger(taskCounts?.[selectedFlow], 0);
  const allowedCount = isAccountWhitelisted === true ? 10 : 3;

  useEffect(() => {
    setWorkspaceItems([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setWorkspaceItems([]);
      setIsLoading(true);
      await getWorkspaceItems();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getWorkspaceItems = async () => {
    const response = await workspaceActions.getFreeTrialWorkspaceTasksByIdentifier(
      getAccessToken,
      cancelTokenSource,
      selectedFlow,
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setWorkspaceItems([...items]);
    }
  };

  const backButtonFunction = () => {
    setSelectedFlow(undefined);
    setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  };

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        />
      );
    }
  }, []);

  const loadPipelineOverlay = (selectedItem) => {
    switch (selectedItem?.type) {
      case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
        toastContext.showOverlayPanel(
          <SalesforceToGitMergeSyncTaskWizardOverlay
            taskModel={modelHelpers.parseObjectIntoModel(selectedItem, tasksMetadata)}
          />
        );
        break;
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        toastContext.showOverlayPanel(
          <SalesforceOrganizationSyncTaskWizardOverlay
            taskModel={modelHelpers.parseObjectIntoModel(selectedItem, tasksMetadata)}
          />,
        );
        break;
    }
  };

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <div className={"d-flex m-3"}>
          <h5><IconBase icon={faWarning} className={"mr-2"} /></h5>
          <H5FieldSubHeader
            className={"mb-3"}
            subheaderText={`You have registered ${currentCount} out of the allowed ${allowedCount} ${taskTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier(selectedFlow)} Tasks.`}
          />
        </div>
      </CenteredContentWrapper>
      <CenteredContentWrapper>
        <div>You may select and run an existing Task or delete one to add another.</div>
      </CenteredContentWrapper>
      <div>
        <FreeTrialWorkflowItemSelectionCardView
          isLoading={isLoading}
          workspaceItems={workspaceItems}
          setSelectedWorkflowItem={loadPipelineOverlay}
        />
      </div>
    </div>
  );
}

FreeTrialAccountTaskLimitReachedSalesforceWorkflowScreen.propTypes = {
  selectedFlow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  isAccountWhitelisted: PropTypes.bool,
  taskCounts: PropTypes.object,
  className: PropTypes.string,
  setSelectedFlow: PropTypes.func,
};


