import React from "react";
import PropTypes from "prop-types";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import FilterContainer from "components/common/table/FilterContainer";
import FreeTrialWorkspaceItemViews from "components/workspace/trial/views/all/FreeTrialWorkspaceItemViews";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import BackButton from "components/common/buttons/back/BackButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

// TODO: Rename
export default function FreeTrialLaunchSalesforceWorkflowScreen(
  {
    setCurrentScreen,
    className,
    isLoading,
    workspaceItems,
    loadData,
    taskMetadata,
  }) {
  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          customMessage={"Loading Salesforce Workflows"}
        />
      );
    }

    return (
      <FreeTrialWorkspaceItemViews
        workspaceItems={workspaceItems}
        isLoading={isLoading}
        loadData={loadData}
        taskMetadata={taskMetadata}
      />
    );
  };

  const backButtonFunction = () => {
    setCurrentScreen(LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_OPTION_SCREEN);
  };

  const getBackButton = () => {
    return (
      <BackButton
        backButtonFunction={backButtonFunction}
      />
    );
  };

  return (
    <div className={className}>
      <FilterContainer
        body={getBody()}
        titleIcon={faRectangleList}
        isLoading={isLoading}
        loadData={loadData}
        title={"Select a Salesforce Workflow"}
        className={""}
      />
      <ButtonContainerBase
        className={"mt-3"}
        leftSideButtons={getBackButton()}
      >
      </ButtonContainerBase>
    </div>
  );
}

FreeTrialLaunchSalesforceWorkflowScreen.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  workspaceItems: PropTypes.array,
  loadData: PropTypes.func,
  taskMetadata: PropTypes.object,
};


