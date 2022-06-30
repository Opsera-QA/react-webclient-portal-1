import React, { useState } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import SapCpqRunAssistantConfigurationEditorPanel from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/SapCpqRunAssistantConfigurationEditorPanel";
import SapCpqRunParameterConfigurationIndexSelectInput from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/inputs/SapCpqRunParameterConfigurationIndexSelectInput";
import Col from "react-bootstrap/Col";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import SapCpqRunAssistantSelectConfigurationButton from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/SapCpqRunAssistantSelectConfigurationButton";

const SapCpqRunAssistantConfigurationSelectionScreen = ({
  sapCpqRunParametersModel,
  setSapCpqRunParametersModel,
  setRunAssistantScreen,
  closePanelFunction,
}) => {
  const [
    sapCpqRunParameterConfigurationModel,
    setSapCpqRunParameterConfigurationModel,
  ] = useState(undefined);

  if (sapCpqRunParametersModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">SAP CPQ Run Assistant: Configuration Selection</div>
      <div className="text-muted">
        Select and configure the Migration Object parameters.
      </div>
      <Row className="my-3">
        <Col
          sm={12}
          lg={6}
        >
          <SapCpqRunParameterConfigurationIndexSelectInput
            sapCpqRunParametersModel={sapCpqRunParametersModel}
            setSapCpqRunParametersModel={setSapCpqRunParametersModel}
            configurations={sapCpqRunParametersModel?.getData("configurations")}
          />
        </Col>
      </Row>
      <SapCpqRunAssistantConfigurationEditorPanel
        sapCpqRunParametersModel={sapCpqRunParametersModel}
        sapCpqRunParameterConfigurationModel={
          sapCpqRunParameterConfigurationModel
        }
        setSapCpqRunParameterConfigurationModel={
          setSapCpqRunParameterConfigurationModel
        }
        index={sapCpqRunParametersModel?.getData("selectedConfigurationIndex")}
      />
      <SaveButtonContainer>
        <SapCpqRunAssistantSelectConfigurationButton
          sapCpqRunParametersModel={sapCpqRunParametersModel}
          setSapCpqRunParametersModel={setSapCpqRunParametersModel}
          sapCpqRunParameterConfigurationModel={
            sapCpqRunParameterConfigurationModel
          }
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

SapCpqRunAssistantConfigurationSelectionScreen.propTypes = {
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  sapCpqRunParametersModel: PropTypes.object,
  setSapCpqRunParametersModel: PropTypes.func,
};

export default SapCpqRunAssistantConfigurationSelectionScreen;
