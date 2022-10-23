import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import ScriptLanguageSelectInput
  from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import ScriptValueInput from "components/inventory/scripts/details/ScriptValueInput";
import useComponentStateReference from "hooks/useComponentStateReference";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";

export default function PipelineInstructionsEditorPanel(
  {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    handleClose,
  }) {
  const {
    isSaasUser,
  } = useComponentStateReference();

  const getDynamicFields = () => {
    if (isSaasUser !== true) {
      return (
        <Col xs={12}>
          <RoleAccessInput
            disabled={pipelineInstructionsModel?.canEditAccessRoles() !== true}
            model={pipelineInstructionsModel}
            setModel={setPipelineInstructionsModel}
          />
        </Col>
      );
    }
  };

  if (pipelineInstructionsModel == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={pipelineInstructionsModel}
      setModel={setPipelineInstructionsModel}
      handleClose={handleClose}
      className={"mx-2 mb-2"}
    >
      <Row>
        <Col xs={12} md={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={pipelineInstructionsModel}
            setDataObject={setPipelineInstructionsModel}
          />
        </Col>
        <Col xs={12} md={6}>
          <ScriptLanguageSelectInput setModel={setPipelineInstructionsModel} model={pipelineInstructionsModel} />
        </Col>
        <Col xs={12}>
          <ScriptValueInput setModel={setPipelineInstructionsModel} model={pipelineInstructionsModel} />
        </Col>
        {getDynamicFields()}
        <TagMultiSelectInput
          dataObject={pipelineInstructionsModel}
          setDataObject={setPipelineInstructionsModel}
        />
      </Row>
    </VanityEditorPanelContainer>
  );
}

PipelineInstructionsEditorPanel.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
  handleClose: PropTypes.func,
  setPipelineInstructionsModel: PropTypes.func
};


