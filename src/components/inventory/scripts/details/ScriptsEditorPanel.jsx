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
import DataValidatorInput from "components/common/inputs/object/data_validator/DataValidatorInput";

export default function ScriptsEditorPanel(
  {
    scriptModel,
    setScriptModel,
    handleClose,
  }) {
  if (scriptModel == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={scriptModel}
      setModel={setScriptModel}
      handleClose={handleClose}
      className={"mx-2 mb-2"}
    >
      <Row>
        <Col xs={12} md={6}>
          <TextInputBase disabled={!scriptModel?.isNew()} setDataObject={setScriptModel} dataObject={scriptModel} fieldName={"name"}/>
        </Col>
        <Col xs={12} md={6}>
          <ScriptLanguageSelectInput setModel={setScriptModel} model={scriptModel} />
        </Col>
        <Col xs={12}>
          <ScriptValueInput setModel={setScriptModel} model={scriptModel} />
        </Col>
        <Col xs={12}>
          <RoleAccessInput
            disabled={scriptModel?.canEditAccessRoles() !== true}
            model={scriptModel}
            setModel={setScriptModel}
          />
        </Col>
        <Col md={12}>
          <DataValidatorInput
            model={scriptModel}
            setModel={setScriptModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ScriptsEditorPanel.propTypes = {
  scriptModel: PropTypes.object,
  handleClose: PropTypes.func,
  setScriptModel: PropTypes.func
};


