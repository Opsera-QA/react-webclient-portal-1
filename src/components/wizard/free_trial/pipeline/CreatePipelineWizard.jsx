import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import CreatePipelineWizardFlowSelectionScreen
  from "components/wizard/free_trial/pipeline/flow_selection/CreatePipelineWizardFlowSelectionScreen";
import CreateSalesforcePipelineWizard
  from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";

export const CREATE_PIPELINE_WIZARD_SCREENS = {
  FLOW_SELECTION_SCREEN: "flow_selection_screen",
  SALESFORCE_FLOW: "salesforce_flow",
  SDLC_FLOW: "sdlc_flow",
};

function CreatePipelineWizard() {
  const toastContext = useContext(DialogToastContext);
  const [currentScreen, setCurrentScreen] = useState(CREATE_PIPELINE_WIZARD_SCREENS.FLOW_SELECTION_SCREEN);

  const closeOverlayFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_PIPELINE_WIZARD_SCREENS.FLOW_SELECTION_SCREEN:
        return (
          <CreatePipelineWizardFlowSelectionScreen
            setCurrentScreen={setCurrentScreen}
            closeOverlayFunction={closeOverlayFunction}
          />
        );
      case CREATE_PIPELINE_WIZARD_SCREENS.SALESFORCE_FLOW:
        return (
          <CreateSalesforcePipelineWizard
          />
        );
      case CREATE_PIPELINE_WIZARD_SCREENS.SDLC_FLOW:
        return (
          <div>Coming Soon</div>
        );
    }
  };

  return (
    <CreateCenterPanel
      closePanel={closeOverlayFunction}
      objectType={"Pipeline"}
      showCloseButton={true}
    >
      {getCurrentScreen()}
    </CreateCenterPanel>
  );
}

CreatePipelineWizard.propTypes = {
  toolMetadata: PropTypes.object,
};

export default CreatePipelineWizard;


