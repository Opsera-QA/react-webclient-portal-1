import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import SfdcComponentListInput
from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcComponentListInput";
import SfdcPipelineWizardFileSelectionDateTimeRange
from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardFileSelectionDateTimeRange";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {faArrowLeft} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import DependencyAnalyserSubmitSelectedComponentsButton from "./DependencyAnalyserSubmitSelectedComponentsButton";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";

const DependencyAnalyserComponentSelectionScreen = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen }) => {
  if (pipelineWizardModel == null) {
    return null;
  }

  const backButtonClick = () => {
    let newPipelineWizardModel = {...pipelineWizardModel};
    newPipelineWizardModel.setData("selectedComponentTypes",[]);
    setPipelineWizardModel({...newPipelineWizardModel});
    setPipelineWizardScreen(DEPENDENCY_ANALYSER_SCREENS.INITIALIZATION_SCREEN);
  };

  return (
    <div>
      <div className="h5">Salesforce Dependency Analyser: Component Type Selection</div>
      <SfdcComponentListInput
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        selectedComponents={[...pipelineWizardModel.getArrayData("selectedComponentTypes")]}
      />
      <div className={"my-3"}>
        <SfdcPipelineWizardFileSelectionDateTimeRange
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
        />
      </div>
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => backButtonClick()}>
          <IconBase icon={faArrowLeft} className={"mr-1"}/>Back
        </Button>
        <DependencyAnalyserSubmitSelectedComponentsButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
        />
      </SaveButtonContainer>
    </div>
  );
};

DependencyAnalyserComponentSelectionScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func
};

export default DependencyAnalyserComponentSelectionScreen;
