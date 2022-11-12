import React, { useState } from "react";
import CreateSalesforceWorkflowWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import CreateWorkflowWizardFlowSelectionScreen
  from "components/wizard/free_trial/workflows/flows/selection/CreateWorkflowWizardFlowSelectionScreen";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useHistory } from "react-router-dom";

export const CREATE_WORKFLOW_WIZARD_SCREENS = {
  FLOW_SELECTION_SCREEN: "flow_selection_screen",
  SALESFORCE_FLOW: "salesforce_flow",
  GIT_CUSTODIAN_FLOW: "git_custodian_flow",
  SDLC_FLOW: "sdlc_flow",
};

export default function CreateWorkflowWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_WORKFLOW_WIZARD_SCREENS.SALESFORCE_FLOW);
  const [buttonContainer, setButtonContainer] = useState(undefined);
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    history.push(history.location);
  };

  const backButtonFunction = () => {
    setCurrentScreen(CREATE_WORKFLOW_WIZARD_SCREENS.FLOW_SELECTION_SCREEN);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_WORKFLOW_WIZARD_SCREENS.FLOW_SELECTION_SCREEN:
        return (
          <CreateWorkflowWizardFlowSelectionScreen
            setCurrentScreen={setCurrentScreen}
            closeOverlayFunction={closeOverlayFunction}
            setButtonContainer={setButtonContainer}
            className={"m-4"}
          />
        );
      case CREATE_WORKFLOW_WIZARD_SCREENS.SALESFORCE_FLOW:
        return (
          <CreateSalesforceWorkflowWizard
            backButtonFunction={backButtonFunction}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_WORKFLOW_WIZARD_SCREENS.SDLC_FLOW:
        return (
          <div>Coming Soon</div>
        );
      case CREATE_WORKFLOW_WIZARD_SCREENS.GIT_CUSTODIAN_FLOW:
        return (
          <div>Coming Soon</div>
        );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      titleText={"Create a new Workflow"}
      buttonContainer={buttonContainer}
      showCloseButton={false}
    >
      {getCurrentScreen()}
    </CenterOverlayContainer>
  );
}

CreateWorkflowWizard.propTypes = {};


