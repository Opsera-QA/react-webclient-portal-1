import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import InformaticaRunAssistantConfigurationEditorPanel
  from "components/workflow/run_assistants/informatica/configuration_selection_screen/InformaticaRunAssistantConfigurationEditorPanel";

const InformaticaRunAssistantConfigurationSelectionScreen = (
  {
    informaticaRunParametersModel,
    setInformaticaRunParametersModel,
    setRunAssistantScreen,
    closePanelFunction,
  }) => {
  const [informaticaRunParameterConfigurationModel, setInformaticaRunParameterConfigurationModel] = useState(undefined);

  const getConfiguration = () => {
    const selectedIndex = informaticaRunParametersModel?.getData("selectedConfigurationIndex");

    if (typeof selectedIndex === "number") {
      const configurations = informaticaRunParametersModel?.getData("configurations");

      if (Array.isArray(configurations) && configurations.length > selectedIndex) {
        return configurations[selectedIndex];
      }
    }
  };

  if (informaticaRunParametersModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Informatica Run Assistant: Configuration Selection</div>
      <div className="text-muted">Select and configure the Migration Object parameters.</div>
      <Row className="my-3">
      {/*  <Col sm={12} lg={6}>*/}
      {/*    <TextInputBase fieldName={"namespacePrefix"} setDataObject={setPipelineWizardModel} dataObject={pipelineWizardModel} />*/}
      {/*  </Col>*/}
      {/*  <Col sm={12} lg={6}>*/}
      {/*    <SfdcPipelineWizardIncludedComponentTypesRadioInput*/}
      {/*      pipelineWizardModel={pipelineWizardModel}*/}
      {/*      setPipelineWizardModel={setPipelineWizardModel}*/}
      {/*    />*/}
      {/*  </Col>*/}
      </Row>
      <InformaticaRunAssistantConfigurationEditorPanel
        informaticaRunParameterConfigurationModel={informaticaRunParameterConfigurationModel}
        setInformaticaRunParameterConfigurationModel={setInformaticaRunParameterConfigurationModel}
        configuration={getConfiguration()}
      />
      {/*<SaveButtonContainer>*/}
      {/*  <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);}}>*/}
      {/*    <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back*/}
      {/*  </Button>*/}
      {/*  <SfdcPipelineWizardSubmitComponentTypesButton*/}
      {/*    pipelineWizardModel={pipelineWizardModel}*/}
      {/*    setPipelineWizardScreen={setPipelineWizardScreen}*/}
      {/*  />*/}
      {/*  <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />*/}
      {/*</SaveButtonContainer>*/}
    </div>
  );
};

InformaticaRunAssistantConfigurationSelectionScreen.propTypes = {
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func
};

export default InformaticaRunAssistantConfigurationSelectionScreen;
