import React, { useState } from "react";
import CreateSalesforceWorkflowWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import CreateWorkflowWizardFlowSelectionScreen
  from "components/wizard/free_trial/workflows/flows/selection/CreateWorkflowWizardFlowSelectionScreen";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useHistory } from "react-router-dom";
import useGetNewTaskModel from "components/tasks/hooks/useGetNewTaskModel";

export const CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS = {
  RESOURCE_SELECTION_SCREEN: "resource_selection_screen",
  SALESFORCE_FLOW: "salesforce_flow",
  GIT_CUSTODIAN_FLOW: "git_custodian_flow",
  SDLC_FLOW: "sdlc_flow",
};

export default function CreateWorkspaceResourceWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN);
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
    setCurrentScreen(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN:
        return (
          <CreateWorkflowWizardFlowSelectionScreen
            setCurrentScreen={setCurrentScreen}
            closeOverlayFunction={closeOverlayFunction}
            setButtonContainer={setButtonContainer}
            className={"m-4"}
          />
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.SALESFORCE_FLOW:
        return (
          <CreateSalesforceWorkflowWizard
            backButtonFunction={backButtonFunction}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.SDLC_FLOW:
        return (
          <div>Coming Soon</div>
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.GIT_CUSTODIAN_FLOW:
        return (
          <div>Coming Soon</div>
        );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      titleText={"Create a New Workspace Resource"}
      buttonContainer={buttonContainer}
      showCloseButton={false}
    >
      {getCurrentScreen()}
    </CenterOverlayContainer>
  );
}

CreateWorkspaceResourceWizard.propTypes = {};


