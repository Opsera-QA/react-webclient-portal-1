import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import ApigeeRunAssistantConfigurationEditorPanel
  from "components/workflow/run_assistants/apigee/configuration_selection_screen/ApigeeRunAssistantConfigurationEditorPanel";
import ApigeeRunParameterConfigurationIndexSelectInput
  from "components/workflow/run_assistants/apigee/configuration_selection_screen/inputs/ApigeeRunParameterConfigurationIndexSelectInput";
import Col from "react-bootstrap/Col";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import ApigeeRunAssistantSelectConfigurationButton
  from "components/workflow/run_assistants/apigee/configuration_selection_screen/ApigeeRunAssistantSelectConfigurationButton";

const ApigeeRunAssistantConfigurationSelectionScreen = (
  {
    apigeeRunParametersModel,
    setApigeeRunParametersModel,
    setRunAssistantScreen,
    closePanelFunction,
  }) => {
  const [apigeeRunParameterConfigurationModel, setApigeeRunParameterConfigurationModel] = useState(undefined);

  if (apigeeRunParametersModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Apigee Run Assistant: Configuration Selection</div>
      <div className="text-muted">Select and configure the Migration Object parameters.</div>
      <Row className="my-3">
        <Col sm={12} lg={6}>
          <ApigeeRunParameterConfigurationIndexSelectInput
            apigeeRunParametersModel={apigeeRunParametersModel}
            setApigeeRunParametersModel={setApigeeRunParametersModel}
            configurations={apigeeRunParametersModel?.getData("configurations")}
          />
        </Col>
      </Row>
      <ApigeeRunAssistantConfigurationEditorPanel
        apigeeRunParametersModel={apigeeRunParametersModel}
        apigeeRunParameterConfigurationModel={apigeeRunParameterConfigurationModel}
        setApigeeRunParameterConfigurationModel={setApigeeRunParameterConfigurationModel}
        index={apigeeRunParametersModel?.getData("selectedConfigurationIndex")}
      />
      <SaveButtonContainer>
        <ApigeeRunAssistantSelectConfigurationButton
          apigeeRunParametersModel={apigeeRunParametersModel}
          setApigeeRunParametersModel={setApigeeRunParametersModel}
          apigeeRunParameterConfigurationModel={apigeeRunParameterConfigurationModel}
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

ApigeeRunAssistantConfigurationSelectionScreen.propTypes = {
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func
};

export default ApigeeRunAssistantConfigurationSelectionScreen;
