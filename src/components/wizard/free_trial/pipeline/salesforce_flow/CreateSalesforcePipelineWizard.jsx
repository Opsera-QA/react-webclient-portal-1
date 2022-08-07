import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import CreatePipelineWizardFlowSelectionScreen
  from "components/wizard/free_trial/pipeline/flow_selection/CreatePipelineWizardFlowSelectionScreen";

const CREATE_PIPELINE_WIZARD_SCREENS = {
  FLOW_SELECTION_SCREEN: "flow_selection_screen",
  SALESFORCE_FLOW: "salesforce_flow",
  SDLC_FLOW: "sdlc_flow",
};

function CreateSalesforcePipelineWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_PIPELINE_WIZARD_SCREENS.FLOW_SELECTION_SCREEN);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_PIPELINE_WIZARD_SCREENS.FLOW_SELECTION_SCREEN:
        return (
          <CreatePipelineWizardFlowSelectionScreen
            setCurrentScreen={setCurrentScreen}
          />
        );
    }
  };

  return (
    <div>
      You should be creating a Salesforce pipeline
    </div>
  );
}

CreateSalesforcePipelineWizard.propTypes = {
  toolMetadata: PropTypes.object,
};

export default CreateSalesforcePipelineWizard;


