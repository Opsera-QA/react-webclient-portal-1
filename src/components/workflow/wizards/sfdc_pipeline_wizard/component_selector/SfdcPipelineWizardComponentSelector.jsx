import React from "react";
import PropTypes from "prop-types";
import {Button, Row} from "react-bootstrap";
import SfdcComponentListInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcComponentListInput";
import Col from "react-bootstrap/Col";
import CancelButton from "components/common/buttons/CancelButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SfdcPipelineWizardFileSelectionDateTimeRange
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardFileSelectionDateTimeRange";
import SfdcPipelineWizardIncludedComponentTypesRadioInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardIncludedComponentTypesRadioInput";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitComponentTypesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardSubmitComponentTypesButton";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";
import SfdcPipelineWizardIncludeDependenciesToggle
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardIncludeDependenciesToggle";

const SfdcPipelineWizardComponentSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
  if (pipelineWizardModel == null) {
    return null;
  }

  const backButtonClick = () => {
    let newPipelineWizardModel = {...pipelineWizardModel};
    newPipelineWizardModel.setData("selectedComponentTypes",[]);
    setPipelineWizardModel({...newPipelineWizardModel});
    setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  };

  return (
    <div>
      <div className="h5">Salesforce Pipeline Run: Component Type Selection</div>
      <div className="text-muted">Select which component types to include in this pipeline run.</div>
      <Row className="my-3">
        <Col sm={12} lg={6}>
          <TextInputBase fieldName={"namespacePrefix"} setDataObject={setPipelineWizardModel} dataObject={pipelineWizardModel} />
        </Col>
        <Col sm={12} lg={6}>
          <SfdcPipelineWizardIncludedComponentTypesRadioInput
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
          />
        </Col>
      </Row>
      <SfdcComponentListInput
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        selectedComponents={[...pipelineWizardModel.getArrayData("selectedComponentTypes")]}
      />
      <SfdcPipelineWizardIncludeDependenciesToggle
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
      />
      <div className={"my-3"}>
        <SfdcPipelineWizardFileSelectionDateTimeRange
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
        />
      </div>
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => backButtonClick()}>
          <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back
        </Button>
        <SfdcPipelineWizardSubmitComponentTypesButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
        />
        <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
      </SaveButtonContainer>
    </div>
  );
};

SfdcPipelineWizardComponentSelector.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func
};

export default SfdcPipelineWizardComponentSelector;
