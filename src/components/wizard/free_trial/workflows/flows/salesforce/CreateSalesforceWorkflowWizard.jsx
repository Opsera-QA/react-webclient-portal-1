import React, { useEffect, useState } from "react";
import CreateSalesforceWorkflowWizardFlowSelectionScreen from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardFlowSelectionScreen";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceWorkflowWizardFlowWrapper
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/wizards/CreateSalesforceWorkflowWizardFlowWrapper";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";

export const CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_FLOW_SCREEN: "select_flow_screen",
  WIZARD_FLOW_SCREEN: "wizard_flow_screen",
};

const getButtonContainer = () => {
  return (
    <ButtonContainerBase
      leftSideButtons={getLeftHandButtons()}
      className={"p-3"}
    >
    </ButtonContainerBase>
  );
};

const getLeftHandButtons = (stepBackFromWizardFunction) => {
  return (
    <div className={"d-flex"}>
      <BackButtonBase
        backButtonFunction={stepBackFromWizardFunction}
        className={"mr-2"}
      />
      <CancelOverlayButton />
    </div>
  );
};

export default function CreateSalesforceWorkflowWizard(
  {
    stepBackFromWizardFunction,
    setButtonContainer,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  const [selectedFlow, setSelectedFlow] = useState(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC);

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(getButtonContainer(stepBackFromWizardFunction));
    }
  }, []);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowSelectionScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            stepBackFromWizardFunction={stepBackFromWizardFunction}
            className={"m-4"}
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

CreateSalesforceWorkflowWizard.propTypes = {
  stepBackFromWizardFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

