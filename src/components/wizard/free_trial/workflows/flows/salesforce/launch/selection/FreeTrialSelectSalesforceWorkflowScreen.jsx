import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreateSalesforceWorkflowWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isTaskTypeOfCategory, TASK_TYPE_CATEGORIES } from "components/tasks/task.types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption
  from "components/wizard/free_trial/workflows/flows/salesforce/selection/FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption";
import FreeTrialLaunchSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/FreeTrialLaunchSalesforceWorkflowScreen";

export default function FreeTrialSelectSalesforceWorkflowScreen(
  {
    currentScreen,
    setCurrentScreen,
    className,
  }) {
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskMetadata, setTaskMetadata] = useState(false);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

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
    const response = await workspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setTaskMetadata(response?.data?.taskMetadata);
      const filteredItems = [];

      // TODO: We should make a route that handles this
      const salesforcePipelines = items.filter((workspaceItem) => {
        const types = workspaceItem?.type;

        return (
          workspaceItem?.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE
          && Array.isArray(types) && types[0] === PIPELINE_TYPES.SALESFORCE
        );
      });

      filteredItems.push(...salesforcePipelines);

      const salesforceTasks = items.filter((workspaceItem) => {
        const type = workspaceItem?.type;

        return (
          workspaceItem?.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.TASK
          && isTaskTypeOfCategory(type, TASK_TYPE_CATEGORIES.SALESFORCE, false)
        );
      });
      filteredItems.push(...salesforceTasks);

      setWorkspaceItems([...filteredItems]);
    }
  };

  const goToOptionSelectionScreenFunction = () => {
    setCurrentScreen(LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_OPTION_SCREEN);
  };

  const getBody = () => {
    switch (currentScreen) {
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_OPTION_SCREEN:
        return (
          <div className={"w-100"}>
            <CenteredContentWrapper>
              <H5FieldSubHeader
                className={"mt-3 mb-4 mx-3"}
                subheaderText={"Would you like to create a new Salesforce Workflow or launch an existing one?"}
              />
            </CenteredContentWrapper>
            <div className={"mx-3"}>
              <WizardSelectionRadioOption
                onClickFunction={setCurrentScreen}
                selectedOption={currentScreen}
                option={LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN}
                text={"Create Salesforce Workflow"}
                description={`
                  Set up a new Salesforce Workflow 
                `}
                icon={faSalesforce}
                className={"mb-2"}
              />
              <FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
                isLoading={isLoading}
                workspaceItems={workspaceItems}
                className={"mb-2"}
              />
            </div>
          </div>
        );
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.LAUNCH_EXISTING_WORKFLOW:
        return (
          <FreeTrialLaunchSalesforceWorkflowScreen
            setCurrentScreen={setCurrentScreen}
            className={"m-3"}
            isLoading={isLoading}
            workspaceItems={workspaceItems}
            loadData={loadData}
            taskMetadata={taskMetadata}
            currentScreen={currentScreen}
          />
        );
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizard
            stepBackFromWizardFunction={goToOptionSelectionScreenFunction}
          />
        );
    }
  };

  return (
    <div className={className}>
      {getBody()}
    </div>
  );
}

FreeTrialSelectSalesforceWorkflowScreen.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


