import React, { useState } from "react";
import PropTypes from "prop-types";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import FilterContainer from "components/common/table/FilterContainer";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import BackButton from "components/common/buttons/back/BackButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialWorkflowItemSelectionCardView
  from "components/wizard/free_trial/workflows/flows/selection/card/FreeTrialWorkflowItemSelectionCardView";

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
  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState("");

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          customMessage={"Loading Salesforce Workflows"}
        />
      );
    }

    return (
      <FreeTrialWorkflowItemSelectionCardView
        isLoading={isLoading}
        loadData={loadData}
        workspaceItems={workspaceItems}
        taskMetadata={taskMetadata}
        selectedWorkflowItem={selectedWorkflowItem}
        setSelectedWorkflowItem={setSelectedWorkflowItem}
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
        // loadData={loadData}
        title={"Select Salesforce Workflow"}
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


