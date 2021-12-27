import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import InformaticaRunAssistantConfigurationEditorPanel
  from "components/workflow/run_assistants/informatica/configuration_selection_screen/InformaticaRunAssistantConfigurationEditorPanel";
import InformaticaRunParameterConfigurationIndexSelectInput
  from "components/workflow/run_assistants/informatica/configuration_selection_screen/inputs/InformaticaRunParameterConfigurationIndexSelectInput";
import Col from "react-bootstrap/Col";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import InformaticaRunAssistantSelectConfigurationButton
  from "components/workflow/run_assistants/informatica/configuration_selection_screen/InformaticaRunAssistantSelectConfigurationButton";

const InformaticaRunAssistantConfigurationSelectionScreen = (
  {
    informaticaRunParametersModel,
    setInformaticaRunParametersModel,
    setRunAssistantScreen,
    closePanelFunction,
  }) => {
  const [informaticaRunParameterConfigurationModel, setInformaticaRunParameterConfigurationModel] = useState(undefined);

  if (informaticaRunParametersModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Informatica Run Assistant: Configuration Selection</div>
      <div className="text-muted">Select and configure the Migration Object parameters.</div>
      <Row className="my-3">
        <Col sm={12} lg={6}>
          <InformaticaRunParameterConfigurationIndexSelectInput
            informaticaRunParametersModel={informaticaRunParametersModel}
            setInformaticaRunParametersModel={setInformaticaRunParametersModel}
            configurations={informaticaRunParametersModel?.getData("configurations")}
          />
        </Col>
      </Row>
      <InformaticaRunAssistantConfigurationEditorPanel
        informaticaRunParametersModel={informaticaRunParametersModel}
        informaticaRunParameterConfigurationModel={informaticaRunParameterConfigurationModel}
        setInformaticaRunParameterConfigurationModel={setInformaticaRunParameterConfigurationModel}
        index={informaticaRunParametersModel?.getData("selectedConfigurationIndex")}
      />
      <SaveButtonContainer>
        <InformaticaRunAssistantSelectConfigurationButton
          informaticaRunParametersModel={informaticaRunParametersModel}
          setRunAssistantScreen={setRunAssistantScreen}
        />
        <CancelButton
          className={"ml-2"}
          showUnsavedChangesMessage={false}
          cancelFunction={closePanelFunction}
          size={"sm"}
        />
      </SaveButtonContainer>
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
