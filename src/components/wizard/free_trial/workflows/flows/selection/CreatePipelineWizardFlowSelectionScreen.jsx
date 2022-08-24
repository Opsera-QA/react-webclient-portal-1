import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import PipelineCreationRadioOptionInput, {
  PIPELINE_CREATION_OPTIONS,
} from "components/wizard/free_trial/workflows/flows/selection/PipelineCreationRadioOptionInput";
import WizardButton, { WIZARD_BUTTON_VARIANTS } from "temp-library-components/wizard/button/WizardButton";
import { CREATE_WORKFLOW_WIZARD_SCREENS } from "components/wizard/free_trial/workflows/CreateWorkflowWizard";

function CreatePipelineWizardFlowSelectionScreen(
  {
    closeOverlayFunction,
    setCurrentScreen,
  }) {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const handleContinueButtonFunction = () => {
    switch (selectedOption) {
      case PIPELINE_CREATION_OPTIONS.SALESFORCE:
        setCurrentScreen(CREATE_WORKFLOW_WIZARD_SCREENS.SALESFORCE_FLOW);
        return;
      case PIPELINE_CREATION_OPTIONS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE:
        setCurrentScreen(CREATE_WORKFLOW_WIZARD_SCREENS.SDLC_FLOW);
        return;
    }
  };

  return (
    <div className={"mx-3 my-3"}>
      <PipelineCreationRadioOptionInput
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className={"d-flex mx-auto mt-3"}>
        <WizardButton
          className={"ml-auto mr-3"}
          buttonText={"Cancel"}
          onClickFunction={closeOverlayFunction}
          variant={WIZARD_BUTTON_VARIANTS.SECONDARY}
        />
        <WizardButton
          className={"mr-auto ml-3"}
          buttonText={"Continue"}
          onClickFunction={handleContinueButtonFunction}
          variant={WIZARD_BUTTON_VARIANTS.PRIMARY}
        />
      </div>
    </div>
  );
}

CreatePipelineWizardFlowSelectionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  closeOverlayFunction: PropTypes.func,
};

export default CreatePipelineWizardFlowSelectionScreen;


