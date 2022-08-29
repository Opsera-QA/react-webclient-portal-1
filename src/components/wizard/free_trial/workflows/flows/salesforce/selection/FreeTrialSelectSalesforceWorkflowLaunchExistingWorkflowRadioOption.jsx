import React from "react";
import PropTypes from "prop-types";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import OpseraInfinityCard from "temp-library-components/cards/opsera/OpseraInfinityCard";

export default function FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption(
  {
    currentScreen,
    setCurrentScreen,
    className,
    isLoading,
    workspaceItems,
  }) {
  const getExistingWorkflowDescription = () => {
    if (isLoading === true) {
      return "Loading Salesforce Workflows";
    }

    if (!Array.isArray(workspaceItems) || workspaceItems.length === 0) {
      return "No Salesforce Workflows found. Please create a new one";
    }

    return (`${workspaceItems.length} Salesforce Workflows`);
  };

  return (
    <OpseraInfinityCard
      selectedOption={currentScreen}
      option={LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.LAUNCH_EXISTING_WORKFLOW}
      onClickFunction={setCurrentScreen}
      disabled={!Array.isArray(workspaceItems) || workspaceItems.length === 0}
      className={className}
      isLoading={isLoading}
      title={"Launch Existing Workflow"}
      subTitle={getExistingWorkflowDescription()}
    />
  );
}

FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  workspaceItems: PropTypes.array,
};


