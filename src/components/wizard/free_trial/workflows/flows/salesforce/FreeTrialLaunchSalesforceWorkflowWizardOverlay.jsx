import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import { faWandMagicSparkles } from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import FreeTrialSelectSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/selection/FreeTrialSelectSalesforceWorkflowScreen";

export const LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_OPTION_SCREEN: "select_workflow_screen",
  LAUNCH_EXISTING_WORKFLOW: "launch_existing_workflow_screen",
  CREATE_SALESFORCE_WORKFLOW_SCREEN: "create_salesforce_workflow_screen",
};

export default function FreeTrialLaunchSalesforceWorkflowWizardOverlay() {
  const [currentScreen, setCurrentScreen] = useState(LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_OPTION_SCREEN);
  const [buttonContainer, setButtonContainer] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  const closeOverlayFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getTitle = () => {
    switch (currentScreen) {
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_OPTION_SCREEN:
        return "Select Salesforce Workflow Option";
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.LAUNCH_EXISTING_WORKFLOW:
        return "Launch Salesforce Workflow";
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN:
        return "Create Salesforce Workflow";
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={getTitle()}
      titleIcon={faWandMagicSparkles}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={buttonContainer}
    >
      <FreeTrialSelectSalesforceWorkflowScreen
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        setButtonContainer={setButtonContainer}
      />
    </CenterOverlayContainer>
  );
}

FreeTrialLaunchSalesforceWorkflowWizardOverlay.propTypes = {};


