import React, { useState } from "react";
import CreateSalesforceWorkflowWizardFlowSelectionScreen from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardFlowSelectionScreen";
import CreateSalesforceWorkflowWizardFlowWrapper
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/wizards/CreateSalesforceWorkflowWizardFlowWrapper";
import PropTypes from "prop-types";

export const CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_FLOW_SCREEN: "select_flow_screen",
  WIZARD_FLOW_SCREEN: "wizard_flow_screen",
};

export default function CreateSalesforceWorkflowWizard(
  {
    backButtonFunction,
    setButtonContainer,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  const [selectedFlow, setSelectedFlow] = useState(undefined);

  const goBackToFlowSelectionScreenFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowSelectionScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            className={"m-4"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WIZARD_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowWrapper
            flow={selectedFlow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={goBackToFlowSelectionScreenFunction}
          />
        );
    }
  };

  return (
    <>
      {getCurrentScreen()}
    </>
  );
}

CreateSalesforceWorkflowWizard.propTypes = {
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

