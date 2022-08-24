import React, {useState} from "react";
import CreateSalesforceWorkflowWizardFlowSelectionScreen from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardFlowSelectionScreen";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceWorkflowWizardFlowWrapper
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/wizards/CreateSalesforceWorkflowWizardFlowWrapper";

export const CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_FLOW_SCREEN: "select_flow_screen",
  WIZARD_FLOW_SCREEN: "wizard_flow_screen",
};

export default function CreateSalesforceWorkflowWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  const [selectedFlow, setSelectedFlow] = useState(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowSelectionScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            className={"m-2"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WIZARD_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowWrapper
            flow={selectedFlow}
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

CreateSalesforceWorkflowWizard.propTypes = {};

