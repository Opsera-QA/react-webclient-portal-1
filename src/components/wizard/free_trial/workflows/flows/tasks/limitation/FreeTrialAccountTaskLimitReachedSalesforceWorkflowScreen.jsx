import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { freeTrialWorkspaceActions } from "components/workspace/trial/freeTrialWorkspace.actions";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { faWarning } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import WorkspaceWorkflowSelectionCardView
from "components/landing/v2/widgets/workspace/card/WorkspaceWorkflowSelectionCardView";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import FreeTrialLaunchWorkflowButton
from "components/wizard/free_trial/workflows/flows/selection/FreeTrialLaunchWorkflowButton";
import { workspaceConstants } from "components/workspace/workspace.constants";
import DeleteButtonBase from "temp-library-components/button/delete/DeleteButtonBase";

export default function FreeTrialAccountTaskLimitReachedSalesforceWorkflowScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    setSelectedFlow,
    selectedFlow,
    taskCounts,
    isAccountWhitelisted,
    className,
    selectedWorkflowId,
    setSelectedWorkflowId,
  }) {
  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState(undefined);
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const currentCount = DataParsingHelper.parseInteger(taskCounts?.[selectedFlow], 0);
  const allowedCount = isAccountWhitelisted === true ? 10 : 1;

  useEffect(() => {
    setWorkspaceItems([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        >
          <div className={"d-flex"}>
            <DeleteButtonBase
              className={"mr-2"}
              normalText={"Delete Task"}
              disabled={selectedWorkflowId == null}
              onClickFunction={() => setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.DELETE_TASK_CONFIRMATION_SCREEN)}
            />
            <FreeTrialLaunchWorkflowButton
              workspaceItem={selectedWorkflowItem}
              setWorkspaceItem={setSelectedWorkflowItem}
              workspaceType={workspaceConstants.WORKSPACE_ITEM_TYPES.TASK}
            />
          </div>
        </OverlayWizardButtonContainerBase>
      );
    }
  }, [selectedWorkflowItem]);

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
    const response = await freeTrialWorkspaceActions.getFreeTrialWorkspaceTasksByIdentifier(
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

  const selectWorkflowFunction = (newWorkflow) => {
    setSelectedWorkflowItem(newWorkflow);
    setSelectedWorkflowId(newWorkflow?._id);
  };

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <div className={"d-flex m-3"}>
          <h5><IconBase icon={faWarning} className={"mr-2"} /></h5>
          <H5FieldSubHeader
            className={"mb-2"}
            subheaderText={`You have registered ${currentCount} out of the allowed ${allowedCount} ${taskTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier(selectedFlow)} Tasks.`}
          />
        </div>
      </CenteredContentWrapper>
      <CenteredContentWrapper>
        <div className={"mb-3 focusText"}>You may select and run an existing Task or delete one to add another</div>
      </CenteredContentWrapper>
      <div>
        <WorkspaceWorkflowSelectionCardView
          isLoading={isLoading}
          workspaceItems={workspaceItems}
          setSelectedWorkflowItem={selectWorkflowFunction}
          selectedWorkflowItem={selectedWorkflowItem}
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
  setSelectedWorkflowId: PropTypes.func,
  selectedWorkflowId: PropTypes.string,
};


