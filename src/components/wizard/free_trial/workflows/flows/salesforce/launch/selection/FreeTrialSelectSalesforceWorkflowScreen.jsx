import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreateSalesforceWorkflowWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isTaskTypeOfCategory, TASK_TYPE_CATEGORIES } from "components/tasks/task.types";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import FreeTrialLaunchSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/FreeTrialLaunchSalesforceWorkflowScreen";
import FreeTrialSelectSalesforceWorkflowOptionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/selection/FreeTrialSelectSalesforceWorkflowOptionScreen";

export default function FreeTrialSelectSalesforceWorkflowScreen(
  {
    currentScreen,
    setCurrentScreen,
    setButtonContainer,
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
          <FreeTrialSelectSalesforceWorkflowOptionScreen
            className={""}
            setCurrentScreen={setCurrentScreen}
            isLoading={isLoading}
            workspaceItems={workspaceItems}
            setButtonContainer={setButtonContainer}
          />
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
            setButtonContainer={setButtonContainer}
            backButtonFunction={goToOptionSelectionScreenFunction}
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
  setButtonContainer: PropTypes.func,
  className: PropTypes.string,
};


