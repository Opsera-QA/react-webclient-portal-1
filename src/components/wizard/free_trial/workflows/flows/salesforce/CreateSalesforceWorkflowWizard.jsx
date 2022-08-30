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
    stepBackFromWizardFunction,
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
            stepBackFromWizardFunction={stepBackFromWizardFunction}
            className={"m-4"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WIZARD_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowWrapper
            flow={selectedFlow}
            setButtonContainer={setButtonContainer}
            stepBackFromWizardFunction={goBackToFlowSelectionScreenFunction}
          />
        );
    }
  };

  return (
    <div>
      {getCurrentScreen()}
    </div>
  );
}

CreateSalesforceWorkflowWizard.propTypes = {
  stepBackFromWizardFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

