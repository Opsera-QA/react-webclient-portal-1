import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateSalesforceWorkflowWizard from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { faWandMagicSparkles } from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import FreeTrialSelectSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/selection/FreeTrialSelectSalesforceWorkflowScreen";

export const LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_WORKFLOW_SCREEN: "select_workflow_screen",
  CREATE_SALESFORCE_WORKFLOW_SCREEN: "create_salesforce_workflow_screen",
};

export default function FreeTrialLaunchSalesforceWorkflowWizardOverlay() {
  const [currentScreen, setCurrentScreen] = useState(LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_WORKFLOW_SCREEN);
  const toastContext = useContext(DialogToastContext);

  const closeOverlayFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    switch (currentScreen) {
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_WORKFLOW_SCREEN:
        return  (
          <FreeTrialSelectSalesforceWorkflowScreen

          />
        );
      case LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizard
          />
        );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Launch Salesforce Workflow`}
      titleIcon={faWandMagicSparkles}
      showToasts={true}
    >
      {getBody()}
    </CenterOverlayContainer>
  );
}

FreeTrialLaunchSalesforceWorkflowWizardOverlay.propTypes = {};


