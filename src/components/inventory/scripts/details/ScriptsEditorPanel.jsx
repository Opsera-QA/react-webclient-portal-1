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
        <Col md={6}>
          <TextInputBase disabled={!scriptModel?.isNew()} setDataObject={setScriptModel} dataObject={scriptModel} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <ScriptLanguageSelectInput setModel={setScriptModel} model={scriptModel} />
        </Col>
        <Col md={8}>
          <ScriptValueInput setModel={setScriptModel} model={scriptModel} />
        </Col>
        <Col md={8} className={"my-2"}>
          <RoleAccessInput
            disabled={scriptModel?.canEditAccessRoles() !== true}
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


